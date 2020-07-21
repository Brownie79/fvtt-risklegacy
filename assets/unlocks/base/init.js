'use strict';

main().then(() => {
  console.log("Finished importing base game!")
});

async function main(){
  // Import Powers As Items
  await importPowers();
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
