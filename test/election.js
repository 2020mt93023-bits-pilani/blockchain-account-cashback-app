var Election = artifacts.require('./Election.sol');

contract("Election", function(accounts){
	var electionInstance;

	it("Initialize candidates test", function(){
		return Election.deployed().then(function(instance){
			return instance.candidateCount();
		}).then(function(count){
			assert.equal(count, 2);
		});
	});

	it("Check candidate values", function(){
		return Election.deployed().then(function(instance){
			electionInstance = instance;
			return instance.candidates(1);
		}).then(function(candidate){
			assert.equal(candidate[0], 1, "ID verified and correct");
			assert.equal(candidate[1], "Candidate 1", "Name verified and correct");
			assert.equal(candidate[2], 0, "Vote count verified and correct");
			return electionInstance.candidates(2);	
		}).then(function(candidate){
			assert.equal(candidate[0], 2, "ID verified and correct");
			assert.equal(candidate[1], "Candidate 2", "Name verified and correct");
			assert.equal(candidate[2], 0, "Vote count verified and correct");
		});
	});
});