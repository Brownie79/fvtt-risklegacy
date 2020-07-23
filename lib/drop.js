// Add the listener to the board html element
Hooks.once("canvasReady", (_) => {
  document.getElementById("board").addEventListener("drop", async (event) => {
    // Try to extract the data (type + src)
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
      console.log(event);
      console.log(data);
      await createTileFromItem(data.id, event.clientX, event.clientY)
    } catch (err) {
      return;
    }
  });
});

async function createTileFromItem(objId, x, y){
  let imgPath = game.items.get(objId).data.img
  console.log(imgPath);

  // Determine the Tile Size:
  const tex = await loadTexture(imgPath);
  const _width = tex.width;
  const _height = tex.height;

  // Project the tile Position
  let t = canvas.tiles.worldTransform;
  const _x = (x - t.tx) / canvas.stage.scale.x
  const _y = (y - t.ty) / canvas.stage.scale.y
  
  await Tile.create({
    img: imgPath,
    x: _x,
    y: _y,
    width: _width,
    height: _height
  })
}