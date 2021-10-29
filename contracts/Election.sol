pragma solidity 0.5.16;

/**
 * The Election contract does this and that...
 */
contract Election {
    //string public candidate;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidateCount;

    function addCandidate(string memory _name) private{
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }

  constructor() public {
    addCandidate("Candidate 1");
    addCandidate("Candidate 2");    
  }
}

