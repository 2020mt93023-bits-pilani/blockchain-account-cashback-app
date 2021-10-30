App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Account.json", function(account) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Account = TruffleContract(account);
      // Connect provider to interact with contract
      App.contracts.Account.setProvider(App.web3Provider);
      //App.registerEvents();
      return App.render();
    });
  },

  registerEvents: function(){
    App.contracts.Account.deployed().then(function(instance){
      instance.tranferedMoneyToWalletEvent({},{
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event){
        App.render();
      });

      /*instance.redeemedCashbackEvent({},{
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event){
        //App.render();
      });*/

    });
  },

  render: function() {
    var accountInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Account.deployed().then(function(instance) {
      accountInstance = instance;      
      return accountInstance.accountsCount();
    }).then(function(accountsCount) {
      var accountsResults = $("#accountsResults");
      accountsResults.empty();

      var accountsSelect = $('#accountsSelect');
      accountsSelect.empty();

      var cbaccountsSelect = $('#cbaccountsSelect');
      cbaccountsSelect.empty();

      console.log('accounts Count: '+ accountsCount);
      for (var i = 1; i <= accountsCount; i++) {
        var accountsTemplate = '';
      
        accountInstance.accountNames(i).then(function(accountName, i) {
          return accountName;
        }).then(function(accountName) {
          accountInstance.digitalaccounts(accountName).then(function(digitalaccount) {
            var id = digitalaccount[0];
            var acct_balance = digitalaccount[1];
            var cashback_acct_id = digitalaccount[2];
            var wallet_id = digitalaccount[3];

            // Render accounts option
            var accountOption = "<option value='" + id + "' >" + id + "</ option>"
            accountsSelect.append(accountOption);

            accountInstance.cbaccounts(cashback_acct_id).then(function(cbaccount) {
              var cb_acct_id = cbaccount[0];
              var cb_balance = cbaccount[1];
              // Render accounts option
              var cbaccountsOption = "<option value='" + cb_acct_id + "' >" + cb_acct_id + "</ option>"
              cbaccountsSelect.append(cbaccountsOption);

              console.log('Cashback - ' + cashback_acct_id + ' Balance: ' + cb_balance);
              accountInstance.digitalwallets(wallet_id).then(function(digitalwallet) {
                var wallet_balance = digitalwallet[1];
                console.log('Wallet - ' + wallet_id + ' Balance: ' + wallet_balance);
                var accountTemplate = "<tr><th>" + id + "</th><td>" + acct_balance + "</td><td>" + cb_balance + "</td><td>" + wallet_balance + "</td></tr>";
                console.log('Account Template: '+accountTemplate);
                accountsResults.append(accountTemplate);
              });
            });          
          });
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

transferAmount: function() {
    var accountInstance;
    var accountId = $('#accountsSelect').val();
    var transferAmount = $('#transferAmount').val();
    console.log('Account ID:' + accountId);
    console.log('Transfer Amount: '+transferAmount);
    App.contracts.Account.deployed().then(function(instance) {
      accountInstance = instance;
      return accountInstance.transferMoneyToWallet(accountId, transferAmount, {from: App.account});
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

redeem: function() {
    var accountId = $('#cbaccountsSelect').val();
    console.log('Cashback Account ID:' + accountId);
    App.contracts.Account.deployed().then(function(instance) {
      return instance.redeem(accountId, {from: App.account});
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});