import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployLoogieActionContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const loogieContract = await hre.ethers.getContract<Contract>("Loogie", deployer);
  const loogieNftAddress = await loogieContract.getAddress();

  let weth = process.env.WETH;
  if (hre.network.config.chainId == 31337 || hre.network.name === "localhost") {
    const wethContract = await hre.ethers.getContract<Contract>("WETH", deployer);
    weth = await wethContract.getAddress();
  }

  const [duration, hour, minBidIncrementPercentage] = [86400, 3600, 5];

  await deploy("LoogieAuction", {
    from: deployer,
    args: [duration, hour, minBidIncrementPercentage, weth, loogieNftAddress],
    log: true,
    autoMine: true,
  });
};

export default deployLoogieActionContract;

deployLoogieActionContract.tags = ["LoogieActionContract"];
