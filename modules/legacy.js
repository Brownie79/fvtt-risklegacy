import { FactionActorSheet } from "./faction-sheet.js";
import { PowerItemSheet } from "./power-sheet.js";

Hooks.once("init", async () => {
  console.log("Initalizing Risk:Legacy Game System");

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("risk", FactionActorSheet, { types: ["faction"], makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("risk", PowerItemSheet, { makeDefault: false });
});
