pragma solidity ^0.8.13;

import "./Crowdsale.sol";

contract MyTokenSale is Crowdsale {
    constructor(
        uint256 rate,
        address payable wallet,
        IERC20 token
    )
        Crowdsale(rate, wallet, token) public {

        }
}