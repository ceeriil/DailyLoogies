// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { IERC721 } from '@openzeppelin/contracts/token/ERC721/IERC721.sol';

interface ILoogie is IERC721 {
    event MinterUpdated( address indexed minter);
    function mintItem() external returns (uint256);
    function burnItem(uint256 id) external;
    function setMinter(address minter) external;
    function getCurrentToken() external  view returns (uint256);
}
