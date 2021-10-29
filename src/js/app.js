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

      return App.render();
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
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

      for (var i = 1; i <= accountsCount; i++) {
        accountInstance.digitalaccounts(i).then(function(digitalaccount) {
          var id = digitalaccount[0];
          var balance = digitalaccount[1];
          var cashback_acct_id = digitalaccount[2];
          var wallet_id = digitalaccount[3];

          // Render candidate Result
          var accountTemplate = "<tr><th>" + id + "</th><td>" + balance + "</td><td>" + cashback_acct_id + "</td></tr>" + wallet_id + "</td></tr>"
          accountsResults.append(accountTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});