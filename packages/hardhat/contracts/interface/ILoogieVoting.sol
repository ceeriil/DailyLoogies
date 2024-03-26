// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

interface ILoogieVoting {
    
    struct Ballot {
        uint256 loogieId;
        uint256 startTime;
        uint256 endTime;
        bool ended;
        bytes32[] seeds;
    }

    struct Vote {
        bool hasVoted;
    }

    event SeedGenerated(bytes32  seed);
    event VotedForSeed(uint256 indexed seedIndex);
    event BallotCreated(uint256 indexed startTime, uint256 indexed endTime);
    event BallotEnded();

    function pause() external;
    function unpause() external;
    function vote(uint256 voteFor) external;
    function createBallot(uint256 previousLoogieId) external;
    function closeBallot() external;
}
