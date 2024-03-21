// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

interface ILoogieAuction {
    struct Auction {
        uint256 loogieId;
        uint256 amount;
        uint256 startTime;
        uint256 endTime;
        address payable bidder;
        bool settled;
    }

    event AuctionCreated(uint256 indexed loogieId, uint256 startTime, uint256 endTime);

    event AuctionBid(uint256 indexed loogieId, address indexed sender, uint256 value, bool extended);

    event AuctionSettled(uint256 indexed loogieId, address winner, uint256 amount);

    event AuctionExtended(uint256 indexed loogieId, uint256 endTime);

    event AuctionTimeBufferUpdated(uint256 indexed timeBuffer);
    
    function createBid(uint256 loogieId) external payable;

    function settleAuction() external;

    function settleCurrentAndCreateNewAuction() external;

     function pause() external;

    function unpause() external;

    function setTimeBuffer(uint256 timeBuffer) external;
    
}
