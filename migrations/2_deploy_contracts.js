const Greeter = artifacts.require("Greeter");
const Transaction = artifacts.require("Transaction");
const Transactions = artifacts.require("Transactions");

module.exports = function (deployer) {
  deployer.deploy(Greeter);
  deployer.deploy(Transaction);
  deployer.deploy(Transactions);
};
