import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMockWeth: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  if (hre.network.config.chainId == 31337 || hre.network.name === "localhost" || hre.network.name === "sepolia") {
    await deploy("WETH", {
      from: deployer,
      args: [],
      log: true,
      autoMine: true,
    });
  }
};

export default deployMockWeth;

deployMockWeth.tags = ["MockWeth"];
