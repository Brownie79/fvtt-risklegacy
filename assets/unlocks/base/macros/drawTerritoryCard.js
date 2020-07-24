main().then(()=>{console.log("Card Drawn!")})

async function main(){
  let drawnPileFolder = game.folders.find(el=>el.name=="_drawnTerritoryPile").id
  let cards = game.folders.find(el=>el.name=="Territories").content;
  
  let drawnCard = cards[Math.floor(Math.random() * cards.length)];
  await drawnCard.update({"folder": drawnPileFolder})

  await Tile.create({
    img: drawnCard.img,
    width: 350,
    height: 500
  })
}