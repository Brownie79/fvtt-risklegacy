import { registerSettings } from './modules/settings.js';
import { FactionActorSheet } from "./modules/faction-sheet.js";
import { PowerItemSheet } from "./modules/power-sheet.js";
import { TerritoryItemSheet } from "./modules/territory-sheet.js";
import { ScarItemSheet } from "./modules/scar-sheet.js";
import { CoinItemSheet } from "./modules/coin-sheet.js";

export const log = (...args) => console.log("Risk Legacy | " + args);

Hooks.once("init", async () => {
  log("Initalizing Risk:Legacy Game System");

  //Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("risk", FactionActorSheet, { types: ["faction"], makeDefault: true });
  
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("risk", PowerItemSheet, { types: ["power"], makeDefault: true });
  Items.registerSheet("risk", TerritoryItemSheet, {types: ["territory"], makeDefault: true });
  Items.registerSheet("risk", CoinItemSheet, { types: ["coin"], makeDefault: true })
  Items.registerSheet("risk", ScarItemSheet, { types: ["scar"], makeDefault: true });
});

Hooks.on('ready', async () => {
  //Parse the packs
  log("Getting Risk Legacy Ready");
  let gamepacks = jsyaml.safeLoad(await (await fetch('systems/risklegacy/assets/unlocks/unlocks.yaml')).text()).packs;
  registerSettings(gamepacks); 
}); 

Hooks.on("renderJournalDirectory", (app, html, data) => {
  const rulesButton = $('<button  style="min-width: 96%; margin: 10px 6px;">Base Rules</button>')

  html.find(".directory-footer").append(rulesButton);
  rulesButton.click((ev) => {
    ui.PDFoundry.openURL('systems/risklegacy/assets/rules.pdf');
  })
})