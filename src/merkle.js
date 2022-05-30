const {MerkleTree}=require('merkletreejs');
const keccak256=require('keccak256');



let whitelist = [
    "0xd6095332367CE41B969E053D6B3eD375E8140bbc",
    "0xB53a0053141355e59Ea5999E48c954D33260e83D",
    "0x1E29E270930F0A24576381b7f9F73Cd071109469",
    "0xa4ff6FC669F62457d9f7650A337F5D8d4b6Db1E4",
    "0xace085582F7C1E692Bb5610c7920683d45a27Af7",
  ];
    
    let leafs=whitelist.map(leaf=>keccak256(leaf));
    let tree=new MerkleTree(leafs,keccak256,{sortPairs:true});
    let buf2hex=x=>'0x'+x.toString('hex');
    let root=buf2hex(tree.getRoot());
   console.log(root);


   let trialLeaf=keccak256("0x14dC79964da2C08b23698B3D3cc7Ca32193d9955");
   let proof=tree.getHexProof(trialLeaf);
   //console.log(buf2hex(trialLeaf));
   console.log(trialLeaf);
   console.log(proof);

 // console.log(tree.verify(proof, trialLeaf, root)); 