// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Merkle is ERC20{
// Our Root Hash
bytes32 public root  = 0xba895e092d782fca2e39d32dc543dc405c90ec3de81555a3fd8b5b59b9c6fe46;
 
 mapping(address => bool) public ifClaimed;
 constructor ()ERC20("VinceDev", "VDT"){
 }

function checkValidity(bytes32[] calldata _merkleProof, uint _amount) public  {
    bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, _amount))));
    

       require(MerkleProof.verify(_merkleProof, root, leaf), "Incorrect proof");
       require(ifClaimed[msg.sender] == false, "you have minted");

       _mint(msg.sender, 1000*decimals());

       ifClaimed[msg.sender] = true;
    
 // Or you can mint tokens here
}
}