var Account = artifacts.require('./Account.sol');
/*
    Application Case Study -  Money is transfered from one account to Wallet Account. 
	There is a cashback of 2 rupeees irrespective of the amount transferred to wallet account.
	After sometime, the amount accumulated in cashback account can be moved to the account.
    The below test cases test the below scenarios
	1.  Test the initial values in each of the accounts namely, Account, Cashback Account and Wallet Account.
	2.  Test the values in each of the account after transfering money from Account to WalletAccount
	3.  Redeem the amount in cashback account and move it to Account.
 

*/
contract("Account", function(accounts)
{
	var accountInstance;

	it("Base Initialization", function() {
		return Account.deployed().then(function(instance) {
		  accountInstance = instance;
		  return accountInstance.digitalaccounts('Account-001');
		 //return accountInstance.transferMoneyToWallet('Account-001',20);
		}).then(function(digitalaccount) {
		  assert.equal(digitalaccount[0], "Account-001", "Account contains the correct name");
		  assert.equal(digitalaccount[1], 100, "Balance is correct");
		  assert.equal(digitalaccount[2], "Cashback-001", "Cashback contains the correct name");
		  assert.equal(digitalaccount[3], "Wallet-001", "Walletcontains the correct name");
		  return accountInstance.cbaccounts(digitalaccount[2]);
		}).then(function(cbaccount){
			assert.equal(cbaccount[1], 0, "Cashback value is correct");
			return accountInstance.digitalwallets('Wallet-001');
		}).then(function(walletaccount) {
			assert.equal(walletaccount[1], 0, "Wallet Balance is correct");
		});
	  });
	   

	
	
	it("Transfer Money to Wallet", function() {
		return Account.deployed().then(function(instance) {
		  accountInstance = instance;
		 // return accountInstance.digitalaccounts('Account-001');
		 return accountInstance.transferMoneyToWallet('Account-001',20);
		}).then(function(result){
			return accountInstance.digitalaccounts('Account-001'); 
		}).then(function(digitalaccount) {
		  assert.equal(digitalaccount[0], "Account-001", "Account contains the correct name");
		  assert.equal(digitalaccount[1], 80, "Balance is correct");
		  assert.equal(digitalaccount[2], "Cashback-001", "Cashback contains the correct name");
		  assert.equal(digitalaccount[3], "Wallet-001", "Walletcontains the correct name");
		  return accountInstance.cbaccounts('Cashback-001');
		}).then(function(cbaccount){
			assert.equal(cbaccount[1], 2, "Cashback value is correct");
			return accountInstance.digitalwallets('Wallet-001');
		}).then(function(walletaccount) {
			assert.equal(walletaccount[1], 20, "Wallet Balance is correct");
		});
	  });
	
	  
	  it("Redeem the money from Wallet Account into Main Account", function() {
		return Account.deployed().then(function(instance) {
		  accountInstance = instance;
		  return accountInstance.redeem('Cashback-001');
		}).then(function(result){
		  return accountInstance.digitalaccounts('Account-001');
		
		}).then(function(digitalaccount) {
		  assert.equal(digitalaccount[0], "Account-001", "Account contains the correct name");
		  assert.equal(digitalaccount[1], 82, "Account balance after redeem, Balance is correct");
		  assert.equal(digitalaccount[2], "Cashback-001", "Cashback contains the correct name");
		  assert.equal(digitalaccount[3], "Wallet-001", "Walletcontains the correct name");
		  return accountInstance.cbaccounts('Cashback-001');
		}).then(function(cbaccount){
			assert.equal(cbaccount[1], 0, "Cashback received is correct after redeem");
			return accountInstance.digitalwallets('Wallet-001');
		}).then(function(walletaccount) {
			assert.equal(walletaccount[1], 20, "Wallet Balance is correct after redeem");
		});
	  });
	  
	  it("All the accounts balance value check", function() {
		return Account.deployed().then(function(instance) {
		  accountInstance = instance;
		  return accountInstance.digitalaccounts('Account-001');
		}).then(function(digitalaccount) {
		  assert.equal(digitalaccount[0], "Account-001", "Account contains the correct name");
		  assert.equal(digitalaccount[1], 82, "Account balance after redeem, Balance is correct");
		  assert.equal(digitalaccount[2], "Cashback-001", "Cashback contains the correct name");
		  assert.equal(digitalaccount[3], "Wallet-001", "Walletcontains the correct name");
		  return accountInstance.cbaccounts('Cashback-001');
		}).then(function(cbaccount){
			assert.equal(cbaccount[1], 0, "Cashback value is correct");
			return accountInstance.digitalwallets('Wallet-001');
		}).then(function(walletaccount) {
			assert.equal(walletaccount[1], 20, "Wallet Balance is correct");
		});
	  });
	  
});