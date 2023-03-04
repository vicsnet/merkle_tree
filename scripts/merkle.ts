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


// @ts-ignore

const tre = await StandardMerkleTree.load(JSON.parse(fs.readFileSync("trees.json")))


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

