'use string';
const path = 'systems/risklegacy/assets/unlocks/minorcities/';

if(game.settings.get('risklegacy', 'base-opened')){
  main().then(()=> {
    ui.notifications.info("Finished Importing Minor Cities Pack!")
  })
} else {
  ui.notifications.error("Please open the Base Pack First");
}

async function main(){
  await importRules(); //DONE
  await importScars();
  await importEvents();
  await importDraftCards();
}

async function importRules(){
  const folderPath = path+'rules/'
  const centerX = canvas.dimensions.width / 2
  const centerY = canvas.dimensions.height / 2

  //Turn Them Into Tiles
  // First the Biohazard Tile:
  let biohazard_rules_tex = await loadTexture(folderPath+'images/biohazard_rules.jpg')
  await Tile.create({
    img: folderPath+'images/biohazard_rules.jpg',
    x: centerX,
    y: centerY,
    width:biohazard_rules_tex.width,
    height: biohazard_rules_tex.height
  })
  //Import Them Into JournalEntries
  const rulesFile = await(await fetch(folderPath+'cards.yaml')).text()
  console.log(rulesFile);
  const rules = jsyaml.safeLoadAll(rulesFile);
  console.log(rules);
  let zIndex = 10000;

  const folderId = (await Folder.create({ name: 'Draft Rules', type: "JournalEntry", parent: null })).id;

  for(const rule of rules){
    let _tex = await loadTexture(folderPath+'images/'+rule.imgPath);
    await Tile.create({
      img: folderPath+'images/'+rule.imgPath,
      x: centerX,
      y: centerY,
      z: zIndex,
      width: _tex.width,
      height: _tex.height
    })
    zIndex--;
    await JournalEntry.create({
      name: rule.namespace.split('.')[0],
      img: folderPath+'images/'+rule.imgPath,
      folder: folderId
    }, {renderSheet: false})
  }
}

async function importScars() {
  let folderPath = path+'scars/';
  const scarsFile = await (await fetch(folderPath+'cards.yaml')).text()
  const scars = jsyaml.safeLoadAll(scarsFile);

  //Scars
  let folderId = game.folders.find(el=>el.name == "Scars").id

  for (let scarObj of scars){
    // Create multiple copies of the scar cards
    for(let i=0; i< scarObj.qty; i++){
      await Item.create({
        name: scarObj.namespace.split('.')[0],
        type: "scar",
        folder: folderId,
        permission: {default: 3},
        img: folderPath+`images/${scarObj.data.tokenImg}`,
        data: {
          cardImg: folderPath+"images/"+scarObj.imgPath,
          tokenImg: folderPath+scarObj.data.tokenImg
        }
      })        
    }
  }


}

async function importEvents(){

}

async function importDraftCards(){

}

