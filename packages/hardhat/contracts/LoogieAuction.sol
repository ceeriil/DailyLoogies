// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import { ILoogieAuction } from  "./interface/ILoogieAuction.sol";
import { IWETH } from  "./interface/IWeth.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { Pausable } from "@openzeppelin/contracts/security/Pausable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import { ILoogie } from "./interface/ILoogie.sol";

contract LoogieAuction  is ILoogieAuction,Pausable, ReentrancyGuard, Ownable {

    ILoogie loogie;

    ILoogieAuction.Auction public auction;

    uint8 public minBidIncrementPercentage;

    uint256 public timeBuffer;
     
    uint256 public duration;

      // The address of the WETH contract
    address public weth;

      // all funds go to buidlguidl.eth
  address payable public constant recipient = payable(0xa81a6a910FeD20374361B35C451a4a44F86CeD46);


    constructor(uint256 _duration, uint256 _timeBuffer,  uint8 _minBidIncrementPercentage,  address _weth, address _loogie){
        duration = _duration;
        timeBuffer =_timeBuffer;
        minBidIncrementPercentage = _minBidIncrementPercentage;
        weth = _weth;
        loogie = ILoogie(_loogie);
    }

    /**
     * @notice Pause the Loogie auction house.
     * @dev This function can only be called by the owner when the
     * contract is unpaused. While no new auctions can be started when paused,
     * anyone can settle an ongoing auction.
    */
    function pause() external override onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause the Loogie auction house.
     * @dev This function can only be called by the owner when the
     * contract is paused. If required, this function will start a new auction.
     */
    function unpause() external override onlyOwner {
        _unpause();

        if (auction.startTime == 0 || auction.settled) {
            _createAuction();
        }
    }

    /**
    * @notice Set the auction time buffer.
    * @dev Only callable by the owner.
    */
    function setTimeBuffer(uint256 _timeBuffer) external override onlyOwner {
        timeBuffer = _timeBuffer;

        emit AuctionTimeBufferUpdated(_timeBuffer);
    }


    /**
     * @notice Create a bid for a Loogie, with a given amount.
     * @dev This contract only accepts payment in ETH.
     */

    function createBid(uint256 loogieId) external payable  nonReentrant {
        ILoogieAuction.Auction memory _auction = auction;

        require(_auction.loogieId == loogieId, 'Loogie is not up for auction');
        require(block.timestamp < _auction.endTime, 'Auction expired');
        require(
            msg.value >= _auction.amount + ((_auction.amount * minBidIncrementPercentage) / 100),
            'Must send more than last bid by minBidIncrementPercentage amount'
        );

        address payable lastBidder = _auction.bidder;

        // Refund the last bidder, if applicable
        if (lastBidder != address(0)) {
            //_safeTransferETHWithFallback(lastBidder, _auction.amount);
        }

        auction.amount = msg.value;
        auction.bidder = payable(msg.sender);

        // Extend the auction if the bid was received within `timeBuffer` of the auction end time
        bool extended = _auction.endTime - block.timestamp < timeBuffer;
        if (extended) {
            auction.endTime = _auction.endTime = block.timestamp + timeBuffer;
        }

        emit AuctionBid(_auction.loogieId, msg.sender, msg.value, extended);

        if (extended) {
            emit AuctionExtended(_auction.loogieId, _auction.endTime);
        }
    }

    function settleAuction()   external override whenPaused nonReentrant {
         _settleAuction();
    }

    function settleCurrentAndCreateNewAuction() external override whenPaused nonReentrant  {
       _settleAuction();
       _createAuction();
    }

     /**
     * @notice Settle an auction, finalizing the bid and paying out to the owner.
     * @dev If there are no bids, the Noun is burned.
     */
    function _settleAuction() internal {
        ILoogieAuction.Auction memory _auction = auction;

        require(_auction.startTime != 0, "Auction hasn't begun");
        require(!_auction.settled, 'Auction has already been settled');
        require(block.timestamp >= _auction.endTime, "Auction hasn't completed");

        auction.settled = true;

        if (_auction.bidder == address(0)) {
            loogie.burnItem(_auction.loogieId);
        } else {
            loogie.transferFrom(address(this), _auction.bidder, _auction.loogieId);
        }

        if (_auction.amount > 0) {
            _safeTransferETHWithFallback(owner(), _auction.amount);
        }

        emit AuctionSettled(_auction.loogieId, _auction.bidder, _auction.amount);

    }

    
     /**
     * @notice Create an auction.
     * @dev Store the auction details in the `auction` state variable and emit an AuctionCreated event.
     * If the mint reverts, the minter was updated without pausing this contract first. To remedy this,
     * catch the revert and pause this contract.
     */
    function _createAuction() internal {
        try loogie.mintItem() returns (uint256 loogieId) {
            uint256 startTime = block.timestamp;
            uint256 endTime = startTime + duration;

            auction = Auction( {
                loogieId: loogieId,
                amount: 0,
                startTime: startTime,
                endTime: endTime,
                bidder: payable(0),
                settled: false
            });

            emit AuctionCreated(loogieId, startTime, endTime);
        } catch Error(string memory) {
            _pause();
        }

    }


    /**
     * @notice Transfer ETH. If the ETH transfer fails, wrap the ETH and try send it as WETH.
     */
    function _safeTransferETHWithFallback(address to, uint256 amount) internal {
        if (!_safeTransferETH(to, amount)) {
            IWETH(weth).deposit{ value: amount }();
            IERC20(weth).transfer(to, amount);
        }
    }

    /**
     * @notice Transfer ETH and return the success status.
     * @dev This function only forwards 30,000 gas to the callee.
     */
    function _safeTransferETH(address to, uint256 value) internal returns (bool) {
        (bool success, ) = to.call{ value: value, gas: 30_000 }(new bytes(0));
        return success;
    }

}
