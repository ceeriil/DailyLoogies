import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";
import { Loogie, LoogieAuction } from "../typechain-types";

const deployLoogieActionContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;
  const { ethers } = hre;
  const accounts = await ethers.getSigners();
  const loogieNftAddress = (await get("Loogie")).address;
  const loogieContract = (await ethers.getContractAt("Loogie", loogieNftAddress)) as Loogie;

  let weth = process.env.WETH;
  if (hre.network.config.chainId == 31337 || hre.network.name === "localhost" || hre.network.name == "sepolia") {
    const wethContract = await hre.ethers.getContract<Contract>("WETH", deployer);
    weth = await wethContract.getAddress();
  }

  const [hour, minBidIncrementPercentage] = [3600, 5];
  const duration = hour / 12;

  const loogieAuction = await deploy("LoogieAuction", {
    from: deployer,
    args: [duration, hour, minBidIncrementPercentage, weth, loogieNftAddress],
    log: true,
    autoMine: true,
  });

  await loogieContract.setMinter(loogieAuction.address);

  const loogieAuctionContract = (await ethers.getContractAt(
    "LoogieAuction",
    loogieAuction.address,
    accounts[0],
  )) as LoogieAuction;
  await loogieAuctionContract.pause();
  await loogieAuctionContract.unpause();
  //await loogieAuctionContract;
};

export default deployLoogieActionContract;

deployLoogieActionContract.tags = ["LoogieActionContract"];
