pragma solidity 0.5.16;

/**
 * The Account contract does this and that...
 */
contract Account {
    //string public candidate;
    uint private cb_amount = 2;

    struct DigitalAccount {
        string id;
        uint balance;
        string cashback_acct_id;
        string digital_wallet_id;
    }

    struct Cashback_Account {
        string id;
        uint balance;
        string digital_account_id;
    }

    struct DigitalWallet{
        string id;
        uint balance;
    }

    event tranferedMoneyToWalletEvent(
        string indexed accountName,
        uint indexed amount
    );

    event redeemedCashbackEvent(
        string indexed cashback_acct_id
    );
    

    /*DigitalAccount public digital_account;
    Cashback_Account public  cb_account;
    DigitalWallet public digital_wallet;
    string public errorMessage;*/

    mapping(string => DigitalAccount) public digitalaccounts;
    mapping(string => Cashback_Account) public cbaccounts;
    mapping(string => DigitalWallet) public digitalwallets;
    mapping(uint => string) public accountNames;
    uint public accountsCount;

    function createAccount(string memory accountName, string memory cbName, string memory walletName) private{        
        Cashback_Account memory cb_account = Cashback_Account(cbName, 0, accountName);
        DigitalWallet memory digital_wallet = DigitalWallet(walletName, 0);
        DigitalAccount memory digital_account = DigitalAccount(accountName, 100, cbName, walletName);
        digitalaccounts[accountName] = digital_account;
        cbaccounts[cbName] = cb_account;
        digitalwallets[walletName] = digital_wallet;
        accountsCount++;
        accountNames[accountsCount] = accountName;
    }

    function transferMoneyToWallet(string memory accountName, uint256 amount) public{
            DigitalAccount memory digital_account = digitalaccounts[accountName];
            Cashback_Account memory cb_account = cbaccounts[digital_account.cashback_acct_id];
            DigitalWallet memory digital_wallet = digitalwallets[digital_account.digital_wallet_id];

            require(amount >= 0 && amount <= digital_account.balance, "Transfer amount more than account balance.");
            digital_account.balance -= amount;
            digital_wallet.balance += amount;            
            cb_account.balance += cb_amount;

            digitalaccounts[accountName] = digital_account;
            cbaccounts[digital_account.cashback_acct_id] = cb_account;
            digitalwallets[digital_account.digital_wallet_id] = digital_wallet;

            emit tranferedMoneyToWalletEvent(accountName, amount);
    }

    /*function transferMoney(uint256 amount) public returns (bool success){

        try this.transferMoneyToWallet(amount) 
            returns (bool v) 
        {
            return(true);
        } catch {                
            return(false);
        }
    }*/

    function redeem(string memory cb_account_id) public{        
        Cashback_Account memory cb_account = cbaccounts[cb_account_id];
        DigitalAccount memory digital_account = digitalaccounts[cb_account.digital_account_id];
        
        digital_account.balance += cb_account.balance;
        cb_account.balance = 0;

        cbaccounts[cb_account_id] = cb_account;
        digitalaccounts[cb_account.digital_account_id] = digital_account;

        emit redeemedCashbackEvent(cb_account_id);

    }

  constructor() public {
    createAccount('Account-001', 'Cashback-001', 'Wallet-001');  
  }
}

