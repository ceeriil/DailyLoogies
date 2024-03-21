// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import { ILoogieAuction } from  "./interface/ILoogieAuction.sol";
import { IWETH } from  "./interface/IWeth.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { Pausable } from "@openzeppelin/contracts/security/Pausable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';



contract LoogieAuction  is ILoogieAuction,Pausable, ReentrancyGuard, Ownable {

    ILoogieAuction.Auction public auction;

    uint8 public minBidIncrementPercentage;

    uint256 public timeBuffer;
     
    uint256 public duration;

      // The address of the WETH contract
    address public weth;


    constructor(uint256 _duration, uint256 _timeBuffer,  uint8 _minBidIncrementPercentage){
        duration = _duration;
        timeBuffer =_timeBuffer;
        minBidIncrementPercentage = _minBidIncrementPercentage;
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
    }

    
     /**
     * @notice Create an auction.
     * @dev Store the auction details in the `auction` state variable and emit an AuctionCreated event.
     * If the mint reverts, the minter was updated without pausing this contract first. To remedy this,
     * catch the revert and pause this contract.
     */
    function _createAuction() internal {

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
