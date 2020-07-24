main().then(()=>{
  ui.notifications.info("Game Reset!")
})

async function main(){
  deleteActorTerritoryCards();
  resetDrawnTerritoryPile();
}

function deleteActorTerritoryCards(){
  const factions = game.actors.filter(el=>el.data.type =="faction")

  for(const faction of factions){
  let newItemsList = [];
  for(const item of faction.items){
    if(item.data.type != "territory"){
      newItemsList.push(item)
    }
  }
  faction.update({"items":newItemsList});
  }
}

function resetDrawnTerritoryPile(){
  let drawnPileFolder = game.folders.find(el=>el.name=="_drawnTerritoryPile")
  let territoryFolder = game.folders.find(el=>el.name=="Territories")

  for(const card of drawnPileFolder.content){
    card.update({"folder": territoryFolder.id})
  }
}