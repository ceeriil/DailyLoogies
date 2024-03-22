import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
//import { Contract } from "ethers";

const deployMockWeth: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  if (hre.network.config.chainId == 31337 || hre.network.name === "localhost") {
    await deploy("WETH", {
      from: deployer,
      args: [],
      log: true,
      autoMine: true,
    });
  }
};

export default deployMockWeth;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployMockWeth.tags = ["MockWeth"];
