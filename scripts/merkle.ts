import { MerkleTree } from "merkletreejs";
import { Bytes, keccak256, sha256 } from "ethers/lib/utils";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";;

import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { ethers } from "hardhat";
import { string } from "hardhat/internal/core/params/argumentTypes";

type AccountDetail ={
    Address: string;
    Amount: string;
}
// list of Addresses
// let addresses = [
//     "0x8DCeC3aF87Efc4B258f2BCAEB116D36B9ca012ee",
//     "0x8e4AFA7AF752407783BcFCEB465D456E4179e79A",
//     "0x89F748cd151895781b4694c814d4234914Fc860A",
//     "0x21ec8baBA0f58591E86816671693383C76935cee",
//     "0x0785AC69351A8EADBCd8D3BB0E73a2B0c991Eee6",
//     "0x7EE54c37ECBAF839b60A075e15184Ea8b0166553"
// ]

// Hash Leaves
// let leaves = addresses.map(addr=>keccak256(addr));

// creates merkle tree
// let merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true});

// let rootHash = merkleTree.getRoot().toString("hex");

// console.log(merkleTree.toString())
// console.log(rootHash)


// serverSide code
// let address = addresses[0]
// let hashedAddress = keccak256(address);
// let proof = merkleTree.getHexProof(hashedAddress);

// console.log(proof);

// check proof
// let v = merkleTree.verify(proof, hashedAddress, rootHash)
// console.log(v);

// 311a521c1218442974d910b4c5340bf873562023c00720283f6d97034fcd8d04

async function main(){

    // const [admin1, admin2] = await ethers.getSigners();
    

    const csvFilePath = path.resolve(__dirname, '../Book1.csv');
    
    const headers = ['Address', 'Amount'];
    
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    
    parse(fileContent, {
        delimiter: ',',
        columns: headers,
    }, (error, result
        : AccountDetail[]
        ) => {
            if (error) {
                console.error(error);
            }
            const tokenAndAmount:any =[]
    
      
      console.log("Result", result);
      const finalResult = result.slice(1,10);

      finalResult.map((arre)=>
      tokenAndAmount.push([arre.Address, arre.Amount])
      )

      console.log("tokenAndAmount",tokenAndAmount);

      const tree = StandardMerkleTree.of(tokenAndAmount, ["address", "uint256"]);
      console.log('Merkle Root:', tree.root);

      fs.writeFileSync("tree.json", JSON.stringify(tree.dump().tree));
      fs.writeFileSync("value.json", JSON.stringify(tree.dump().values));
      fs.writeFileSync("trees.json", JSON.stringify(tree.dump()));


    //   const Merkle
      
      

 
});

const AirdropDeploy = await ethers.getContractFactory("Merkle");

const airdropdeploy = await AirdropDeploy.deploy();
await airdropdeploy.deployed();

console.log("the Token Airdropped is deployed at this Address:", airdropdeploy.address)
// const airdropdeploy = await ethers.getContractAt("Merkle", "0xecbDbd2d263cf570481dc0F642E167fEa45289aF")

// @ts-ignore

const tre = await StandardMerkleTree.load(JSON.parse(fs.readFileSync("trees.json")))

// let address:string = admin1.address;

// for (const [i, v] of tre.entries()) {
//     if (v[i] === admin1.address) {
//       // (3)
//       const proof = tre.getProof(i);
//     //   poo = proof;
//       console.log('Value:', v);
//       console.log('Proof:', proof);

//       const claimAirdrop = await airdropdeploy.checkValidity(proof, v[1]);
//       console.log(claimAirdrop);

// }
// }
const helpers = require("@nomicfoundation/hardhat-network-helpers");
// 0x866b1515AcF7e82C8389a65823A6Ca8bB525A0bA
await helpers.impersonateAccount("0x866b1515AcF7e82C8389a65823A6Ca8bB525A0bA");
await helpers.setBalance("0x866b1515AcF7e82C8389a65823A6Ca8bB525A0bA", ethers.utils.parseEther("5"))
const impersonatedSigner:any = await ethers.getSigner("0x866b1515AcF7e82C8389a65823A6Ca8bB525A0bA");

const A = impersonatedSigner.address;





function getproof(Addr:any){
    for (const [i, v] of tre.entries()){     
        if (v[0] === Addr){
            const proof = tre.getProof(i)
            
            const proofvalue = [proof, v[1]]
            console.log("proof",proof)

            return proofvalue;
        }
        
    }
}

const val :any = getproof(impersonatedSigner.address);






const balance:any = await airdropdeploy.balanceOf(impersonatedSigner.address);
console.log("bal1", balance);


const claimAirdrop = await airdropdeploy.connect(impersonatedSigner).checkValidity(val[0], val[1]);

console.log(claimAirdrop);
const bal = await airdropdeploy.balanceOf(impersonatedSigner.address);

console.log("balance2", bal)

await airdropdeploy.connect(impersonatedSigner).checkValidity(val[0], val[1]);

const bal2 = await airdropdeploy.balanceOf(impersonatedSigner.address);
console.log(bal2);






} main().catch((error)=>{
    console.error(error);0x866b1515AcF7e82C8389a65823A6Ca8bB525A0bA})

