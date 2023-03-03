// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Merkle is ERC20{
// Our Root Hash
bytes32 public root  = 0xfb2cad400507ca2eb53a525a2020662427936c0bd946ab489c6785048ffe9fab;
 
 mapping(address => bool) public ifClaimed;
 constructor ()ERC20("VinceDev", "VDT"){
    _mint(address(this), 10000);
 }

function checkValidity(bytes32[] calldata _merkleProof, uint _amount) public  returns(bool a){
    bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, _amount))));
    
    // keccak256(abi.encodePacked(msg.sender));

       require(MerkleProof.verify(_merkleProof, root, leaf), "Incorrect proof");

       _mint(msg.sender, 10 *(10*decimals()));
    // _transfer(address(this), msg.sender, 20);

    a= true; 
    return a; // Or you can mint tokens here
}
}