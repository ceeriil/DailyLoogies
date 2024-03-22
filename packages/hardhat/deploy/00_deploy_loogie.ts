import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
//import { Contract } from "ethers";

const deployLoogieNft: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Loogie", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  // const loogieContract = await hre.ethers.getContract<Contract>("Loogie", deployer);
  //console.log("👋 Initial greeting:", await loogieContract.greeting());
};

export default deployLoogieNft;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployLoogieNft.tags = ["LoogieNft"];
