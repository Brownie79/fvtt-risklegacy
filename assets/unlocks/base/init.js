'use strict';

main().then(() => {
  console.log("RISK LEGACY | Finished importing base game!")
});

async function main(){
  // Import Powers As Items
  await importPowers();
  await importScars();
  await importTerritories();
  await importCoinCards();
  await importFactions();
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
  let folderPath = 'systems/risklegacy/assets/unlocks/base/scars/';
  const scarsFile = await (await fetch(folderPath+'cards.yaml')).text()
  const scars = jsyaml.safeLoadAll(scarsFile);

  let folderId = (await Folder.create({ name: 'Scars', type: "Item", parent: null })).id;
  for (let scarObj of scars){
    // Create multiple copies of the scar cards
    for(let i=0; i< scarObj.qty; i++){
      await Item.create({
        name: scarObj.namespace.split('.')[0],
        type: "scar",
        folder: folderId,
        permission: {default: 3},
        img: `systems/risklegacy/assets/unlocks/base/scars/images/${scarObj.data.tokenImg}`,
        data: {
          cardImg: folderPath+"images/"+scarObj.imgPath,
          tokenImg: folderPath+scarObj.data.tokenImg
        }
      })        
    }
  }
}

async function importTerritories() {
  const folderPath = 'systems/risklegacy/assets/unlocks/base/territories/'
  const territoriesFile = await (await fetch(folderPath+'cards.yaml')).text()
  const territories = jsyaml.safeLoadAll(territoriesFile);
  const folderId = (await Folder.create({name: "Territories", type:"Item", parent: null})).id;

  for(const t of territories){
    await Item.create({
      name: t.namespace.split(".")[0],
      type: "territory",
      folder: folderId,
      permission: {default: 3},
      img: `systems/risklegacy/assets/unlocks/base/territories/images/${t.imgPath}`,
      data: {
        coinImg: folderPath+'images/coin.png',
        value: t.data.value,
        contient: t.data.continent
      }
    })
  }  

}

async function importCoinCards(){
  const folderId = (await Folder.create({name: "Coin Card", type:"Item", parent: null})).id;
  for(let i=0; i<10; i++){
    await Item.create({
      name: "coin_card",
      type: "coin",
      folder: folderId,
      permission: {default: 3},
      img: 'systems/risklegacy/assets/unlocks/base/territories/images/coin_card.jpg'
    })
  }

}

async function importFactions(){
  const folderPath = 'systems/risklegacy/assets/unlocks/base/factions/'
  const factionsFile = await (await fetch(folderPath+'cards.yaml')).text()
  const factions = jsyaml.safeLoadAll(factionsFile);



  for(let faction of factions){
    //Create a Folder
    let folderId = (await Folder.create({ name: faction.data.name, type: "Actor", parent: null })).id;
    //Create a Faction Card
    await Actor.create({
      name: faction.data.name,
      type: "faction",
      img: folderPath+'images/'+faction.imgPath,
      folder: folderId,
      permission: {default: 3},
    })
    //Create a 1 Troop Sheet
    await Actor.create({
      name: faction.namespace.split(".")[0]+"_1",
      type: "troops",
      img: folderPath+'/images/'+faction.data.troop_img,
      folder: folderId,
      permission: {default: 3},
    })
    //Create a 3 Troop Sheet
    await Actor.create({
      name: faction.namespace.split(".")[0]+"_3",
      type: "troops",
      img: folderPath+'/images/'+faction.data.three_img,
      folder: folderId,
      permission: {default: 3},
      token:{
        width: 2,
        height: 2
      }
    })
    //Ceate an HQ Sheet
    await Actor.create({
      name: faction.namespace.split(".")[0]+"_hq",
      type: "troops",
      img: folderPath+'/images/'+faction.data.hq_img,
      folder: folderId,
      permission: {default: 3},
    })
  }
}