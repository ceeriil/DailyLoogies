// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import { ILoogieVoting } from  "./interface/ILoogieVoting.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { Pausable } from "@openzeppelin/contracts/security/Pausable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ILoogie } from "./interface/ILoogie.sol";

contract LoogieVoting  is ILoogieVoting ,Pausable, ReentrancyGuard, Ownable {

    ILoogie loogie;

    ILoogieVoting.Ballot public ballot;
     
    uint256 public duration;
    address[] public voters;

    mapping(address => Vote) public votes;
    mapping(uint256 => uint256) public votesCount;

    constructor(uint256 _duration, address _loogie){
        duration = _duration;
        loogie = ILoogie(_loogie);
    }

      /**
     * @dev Pauses the Loogie voting system.
     * @notice This function can only be called by the owner when the contract is unpaused.
     * While paused, no new votes can be cast, but ongoing votes can still be casted.
     */
    function pause() external override onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses the Loogie voting system.
     * @notice This function can only be called by the owner when the contract is paused.
     * If required, this function will resume voting.
     */
    function unpause() external override onlyOwner {
        _unpause();
    }

    /**
    * @notice Vote for a seed.
    * @dev Allows a user to vote for a specific seed by providing its index.
    * The function emits a VotedForSeed event to signal that a vote has been cast.
    * @param voteFor The index of the seed to vote for.
    */
    function vote(uint256 voteFor) external override {
        require(!ballot.ended, "Voting has ended");

        require(!votes[msg.sender].hasVoted, "You have already voted.");


        require(voteFor < ballot.seeds.length, "Invalid seed index");
        require(votes[msg.sender].hasVoted == false, "You have already voted");

        // Mark the sender as voted
        votes[msg.sender].hasVoted = true;

        votesCount[voteFor] += 1;

        // Emit VotedForSeed event
        emit VotedForSeed(voteFor);
    }

    /**
     * @dev Creates a new ballot.
     * @notice Generates seeds and initializes a new ballot with the current timestamp as the start time
     * and the duration added to it as the end time. Emits a BallotCreated event.
     * If any error occurs during seed generation or ballot initialization, the contract will revert.
     */
    function createBallot(uint256 previousLoogieId) external override whenPaused nonReentrant {
       _createBallot(previousLoogieId);
    }
   
    /**
     * @dev Internal function to create a new ballot.
     */
    function _createBallot(uint256 previousLoogieId) internal {
        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + duration;
        bytes32[] memory generatedSeeds = new bytes32[](4);

        for (uint256 index = 0; index < 4; index++) {
            bytes32 seed = blockhash(block.number - index - 1);
            generatedSeeds[index] = seed;
            emit SeedGenerated(seed);
        }

        ballot =  ILoogieVoting.Ballot({
            loogieId: previousLoogieId+1,
            startTime: startTime,
            endTime: endTime,
            ended: false,
            seeds: generatedSeeds
        });

        emit BallotCreated(startTime, endTime);
    }

    /**
     * @dev Closes the ballot.
     * @notice This function can only be called by the owner and when the ballot has ended.
     * It emits a BallotEnded event to signal the end of the voting period.
     * It also requires that the current time is after the end time of the ballot.
     */
    function closeBallot() external override onlyOwner {
        require(!ballot.ended, "Ballot has already ended");
        require(block.timestamp >= ballot.endTime, "Ballot has not ended yet");

        ballot.ended = true;

        emit BallotEnded();
    }
}
