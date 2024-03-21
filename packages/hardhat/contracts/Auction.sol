// SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0 <0.9.0;
import "./ExampleExternalContract.sol";

contract Auction {
    ExampleExternalContract public exampleExternalContract;

    constructor(address exampleExternalContractAddress) {
        exampleExternalContract = ExampleExternalContract(
            exampleExternalContractAddress
        );
    }

    mapping(address => uint256) public balances;   // Balances of the user's stacked funds
    uint256 public constant threshold = 1 ether;    // Staking threshold
    uint256 public deadline = block.timestamp + 60 seconds;  // Auction deadline

    bool public openForWithdraw;
    bool public executed;

    event Bid(address bidder, uint256 amount);

    modifier notCompleted() {
        require(block.timestamp < deadline, "Deadline has already passed");
        _;
    }

    function bid() public payable notCompleted {
        require(msg.value > 0, "Bid amount must be greater than 0");

        // Check if the bid is higher than the current bid
        require(msg.value > balances[msg.sender], "Bid amount must be higher than the current bid");

        // Transfer the previous bid amount back to the bidder
        if (balances[msg.sender] > 0) {
            (bool refundSuccess, ) = msg.sender.call{value: balances[msg.sender]}("");
            require(refundSuccess, "Failed to refund previous bid amount");
        }

        // Update the bid amount for the bidder
        balances[msg.sender] = msg.value;
        emit Bid(msg.sender, msg.value);
    }

    function execute() public notCompleted {
        require(!executed, "Auction has already been executed");
        executed = true;
        if (address(this).balance >= threshold) {
            exampleExternalContract.complete{value: address(this).balance}();
        } else {
            openForWithdraw = true;
        }
    }

    function withdraw() public notCompleted {
        require(openForWithdraw, "Auction has not failed");
        require(balances[msg.sender] > 0, "No bid amount to withdraw");
        
        // Transfer the bid amount back to the bidder
        (bool success, ) = (msg.sender).call{value: balances[msg.sender]}("");
        require(success, "Failed to send bid amount back to the bidder");
        
        // Clear the bidder's bid amount
        delete balances[msg.sender];
    }

    function timeLeft() public view returns (uint256) {
        if (block.timestamp >= deadline) {
            return 0;
        } else {
            return deadline - block.timestamp;
        }
    }

    receive() external payable {
        bid();
    }
}
