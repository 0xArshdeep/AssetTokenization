pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ArshdeepToken is ERC20 {
    constructor(uint256 initialSupply) ERC20Detailed("Arshdeep Token", "ARSHD", 18) public {
        _mint(msg.sender, intialSupply);
    }
}
