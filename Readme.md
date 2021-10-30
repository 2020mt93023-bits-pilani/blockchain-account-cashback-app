# Account Details DApp

This is a readme file to provide a short description of the Account Details DApp created as part of the Semester 3 Assignment for Blockchain - **Course ID: SEZG569** 


## Introduction

Account Details DApp has been created mainly to explore the functioning of **smart contracts** in blockchain. This application does the following -

 1. Create a smart contract on a local blockchain - Ganache.
 2. Create a UI front end to interact with the blockchain through Metamask account.

### Smart contract
In this application, the smart contract depicts a very simple scenario of transfer an amount from an account to an attached wallet. In the process, a cashback is generated and credited to the cashback account.
Major Objects within the smart contract:

 - Account
 - Wallet
 - Cashback

In this smart contract we are trying to simulate transfer of NFTs from one account to another account/wallet and also explore the cashback concept which we typically see in real world. Though it may be in the most simplistic fashion.

**Scenario:** The smart contract by default creates 1 account, 1 cashback account and 1 wallet and account object will hold the details of the connected cashback account and wallet. All of these objects are created on the blockchain as part of the smart contract. 
**Account**
By default the account will hold 100 NFTs
**Cashback Account**
By default the cashback account will hold 0 NFTs
**Wallet**
By default the wallet account will hold 0 NFTs

**Logic implemented in smart contract**

 - Create the default accounts.
 - Transfer NFTs from Account to Wallet based on the user input.
 - For every transfer, a cashback of 2 NFTs is credited to the cashback account.
 - User is allowed to redeem NFTs from the cashback account to the Account.

**Operations allowed in smart contract**

 - **transferMoneyToWallet:** This takes the account number and amount from the user(UI) checks if the amount specified by the user is less than the account balance and then transfers the amount of NFTs from the account to the wallet. It also credits the cashback account with 2 NFTs.
 - **redeem:** This takes the cashback account number from the user(UI) and credits the cashback NFTs back to the account.

### UI Front End Application
This DApp also provides a very basic implementation of the UI to provide for 
- **Account List:** List all the accounts created in the smart contract in a tabular format. 
- **Transfer money to wallet:** It provides option to select the account and the amount of NFTs to  transfer to the wallet.
- **Redeem:** It provides the option to select the cashback account from which the redeem has to be made. 

[Front End UI Screenshot](https://drive.google.com/file/d/1Z0ERioao89IGigbZ__szrrhokiL1uFD3/view?usp=sharing)

### Test Cases For Smart Contract
The DApp smart contract has been tested using Javascript Mocha Chai framework. The following scenarios have been tested and passed:

 - **Default account creation**: Creation of account, wallet & cashback account with their initial balances.
 - **Transfer of money to wallet**: Money transfer to wallet and checking the balances of account, cashback & wallet accounts.
 - **Redeem from cashback account**: Redeem function and checking the balances of account, wallet & cashback accounts.
 
## Prerequisites
**Truffle Framework:** This framework provides all the necessary libraries including solidity which is used to code smart contracts. Truffle framework also provides cli to compile and deploy smart contracts which are developed using solidity.

**Ganache:** This is a local ethereum blockchain which provides 10 accounts with 100 ether in each account. The local blockchain provides a suitable environment for testing the smart contracts in a very quick manner aiding in the development and testing phases before the smart contracts are finalized and moved to actual production environment.

**Metamask:** This is a chrome/firefox extension which provides an interface to connect to a specific account on the blockchain. The UI code which runs on the browser would interface with the blockchain account through Metamask.

**Editor:** Sublime text with the Ethereum package has been used, but there are other editors as well like Visual studio code can also be used as an IDE for developing the DApp code.

For details on installation and setup refer -
[Installation & Setup](https://docs.google.com/document/d/1Kom-077F2-Tzb0H2Bs-qrG0anVdKMYjl/edit?usp=sharing&ouid=109293213863354066832&rtpof=true&sd=true)

## DApp Code Download Location
Download the code from GitHub by clicking the below link:
[Code Download](https://github.com/2020mt93023-bits-pilani/blockchain-account-cashback-app)

## Running the application
- Download the code from the above location either as a zip or from git.
- Extract the code if its a zip format into a project folder. Ex: blockchain-account-details-app
- Start Ganache
- Open the browser where Metamask extension is installed.
- Complete the steps of setting up Metamask so that there is an account connected to the local ganache setup. Refer the Installation and setup link given above.
- Go to the project folder where project files are extracted or downloaded. Ex. blockchain-account-details-app
- Open the command prompt at this project location.
- Compile & deploy the smart contract code in the local ganache setup by running the command: **truffle migrate --reset**
- Run the tests against the smart contract code deployed in local ganache setup by running the command: **truffle test**
- Front end code can be installed by first downloading the dependent libraries or node modules by running the command: **npm install**
- Start the front end in the browser by running the command: **npm run dev**