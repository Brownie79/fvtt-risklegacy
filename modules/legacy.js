import { registerSettings } from './settings.js';
import { FactionActorSheet } from "./faction-sheet.js";
import { PowerItemSheet } from "./power-sheet.js";

export const log = (...args) => console.log("Risk Legacy | " + args);

Hooks.once("init", async () => {
  console.log("Initalizing Risk:Legacy Game System");

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("risk", FactionActorSheet, { types: ["faction"], makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("risk", PowerItemSheet, { makeDefault: false });
});

Hooks.on('ready', async () => {
  //Parse the packs
  log("Getting Risk Legacy Ready");
  let gamepacks = jsyaml.safeLoad(await (await fetch('systems/risklegacy/assets/unlocks/unlocks.yaml')).text()).packs;
  registerSettings(gamepacks); 
}); 
