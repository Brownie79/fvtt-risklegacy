export const system = "risklegacy"
let packs = {}
/**
 * Creates a menu for opening new packs. Each Pack will register it's own setting.
 * @param packs string[] list of game packs 
*/
export const registerSettings = (_packs) => {
  console.log(_packs);
  for(let p of Object.keys(_packs)){
    game.settings.register(system, `${p}-opened`, {
      scope: "world",
      config: false,
      type: Boolean,
      default: false, 
      onChange: _value => {
        packs[p].opened = _value;
      }
    })
    packs[p] = {
      name: p, 
      description: _packs[p].description,
      opened: game.settings.get(system, `${p}-opened`)
    }
  }

  game.settings.registerMenu(system, 'settingsMenu', {
    name: "Packs",
    label: "Open a New Pack", 
    icon: "fas fa-book",
    type: SettingsForm,
    restricted: true,
  })

}

class SettingsForm extends FormApplication{
  constructor(object, options = {}){
    super(object, options)
  }

  static get defaultOptions(){
    return mergeObject(super.defaultOptions, {
      id: system + ".openpacks",
      title: "Open a New Pack",
      template: "systems/risklegacy/templates/settings_packform.html",
      classes: ["sheet"],
      width: 800,
      closeOnSubmit: true //need to close to refresh the packs openened "true/false"
    })
  }

  getData(){
    let data = {
      packs: packs
    }

    //sets click listeners on all the buttons 
    //runs the init.js of the pock
    Hooks.on("renderSettingsForm", async () => {
      for(let pack of Object.keys(packs)){
        $(`#${pack}`).on("click", async (evt) => {
          game.settings.set(system, `${evt.target.value}-opened`, true);
          let jsFile = await (await fetch(`systems/risklegacy/assets/unlocks/${pack}/init.js`)).text();
          eval(jsFile); /// BIG MAGIC
        })
      }  
    })

    return data;
  }

  async _updateObject(evt, data) { }
}