//var Election = artifacts.require("./Election.sol");
var DigitalAccount = artifacts.require("./Account.sol");

module.exports =  function(deployer) {
  //deployer.deploy(Election);
  deployer.deploy(DigitalAccount);
};
