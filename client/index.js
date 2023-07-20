const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  
  // Get name for proof from arguments
  const args = process.argv;
  const name = args[2];
  const nameIndex = niceList.indexOf(name);

  // Generate proof using Merkle Tree
  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(nameIndex);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof,
    name: name
  });

  console.log({ gift });
}

main();