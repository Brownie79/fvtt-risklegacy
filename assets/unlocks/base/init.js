'use strict';

main().then(() => {
  console.log("Finished importing base game!")
});

async function main(){
  // Import Powers As Items
  await importPowers();
  await importScars();
}

async function importPowers() {
  const powersFile = await (await fetch('systems/risklegacy/assets/unlocks/base/powers/cards.yaml')).text()
  const powers = jsyaml.safeLoadAll(powersFile);

  //Create Folder for Starting Powers
  let folderId = (await Folder.create({ name: 'Starting Powers', type: "Item", parent: null })).id;


  for(let powerObj of powers){
    await Item.create({
      name: powerObj.namespace.split('.')[0],
      type: "power",
      img: 'systems/risklegacy/assets/unlocks/base/powers/power.png',
      folder: folderId,
      permission: {default: 3},
      data: {
        description: powerObj.data.description,
        type: powerObj.data.type
      }
    })
  }
}

async function importScars() {
  const scarsFile = await (await fetch('systems/risklegacy/assets/unlocks/base/scars/cards.yaml')).text()
  const scars = jsyaml.safeLoadAll(scarsFile);

  let folderId = (await Folder.create({ name: 'Scars', type: "Item", parent: null })).id;
  for (let scarObj of scars){
    // Create multiple copies of the scar cards
    for(let i=0; i< scarObj.qty; i++){
      await Item.create({
        name: scarObj.namespace.split('.')[0],
        type: "scar",
        folder: folderId,
        img: `systems/risklegacy/assets/unlocks/base/scars/images/${scarObj.data.tokenImg}`,
        data: {
          cardImg: scarObj.imgPath,
          tokenImg: scarObj.data.tokenImg
        }
      })        
    }
  }
}

async function importTerritories() {
  //Register BOTH as Item and Rolltable
  //Requires Building a Compendium 
}