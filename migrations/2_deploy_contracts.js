const Greeter = artifacts.require("Greeter");
const Transaction = artifacts.require("Transaction");

module.exports = function (deployer) {
  deployer.deploy(Greeter);
  deployer.deploy(Transaction);
};
