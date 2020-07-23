/**
 * @extends {ActorSheet}
 */

export class FactionActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["risk", "faction-sheet"],
      template: "systems/risklegacy/templates/faction-sheet.html",
      width: 930,
      height: 600,
      tabs: [{
        navSelector: ".sheet-tabs",
        contentSelector: ".sheet-body",
        initial: "record"
      }],
      dragDrop: [{dragSelector: [".power-list", ".power", ".card", ".card-list"], dropSelector: [".power-container", ".card-container", ".scar-container"]}]
    });
  }

/**
   * Organize and classify Owned Items for Character sheets
   * @private
   */
  _prepareItems(data) {
    // Partition items by category
    let [powers, territories, scars] = data.items.reduce((arr, item) => {

      // Classify items into types
      if ( item.type === "power" ) arr[0].push(item);
      else if ( item.type === "territory" || item.type === "coin" ) arr[1].push(item);
      else if ( item.type === "scar" ) arr[2].push(item);
      return arr;
    }, [[], [], []]);

    // Assign and return
    data.data.powers = Object.values(powers);
    data.data.territories = Object.values(territories);
    if ( (Object.keys(data.data.scar).length === 0 || !data.data.scar.img) && scars.length > 0 ) this.actor.update({'data.scar': scars[0]});
  }


  /** @override */
  getData() {
    const data = super.getData();
    this._prepareItems(data);
    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".power,.card");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });

    html.find('.item-view').click(ev => {
      const li = $(ev.currentTarget).parents(".card");
      const card = this.actor.getOwnedItem(li.data("itemId"));
      card.sheet.render(true);
    })

    html.find('.territory-plus').click(ev => {
      const li = $(ev.currentTarget).parents(".card");
      const card = this.actor.getOwnedItem(li.data("itemId"));
      card.sheet.addCoin();
    });

    html.find('.territory-minus').click(ev => {
      const li = $(ev.currentTarget).parents(".card");
      const card = this.actor.getOwnedItem(li.data("itemId"));
      card.sheet.removeCoin();
    });

    html.find('.record-add').click(ev => {
      const el = $(ev.currentTarget);
      const record = {
        "player": "",
        "starting_territory": "",
        "game_end": "held_on" | "won" | "eliminated"
      };
      const records = this.getData().data.record;
      records.push(record);
      this.actor.update({ "data.record": records });
    });

    html.find('.record-delete').click(ev => {
      const el = $(ev.currentTarget);
      const index = $('.record-delete').index(el);
      const records = this.getData().data.record;
      records.splice(index, 1);
      this.actor.update({ "data.record": records });
    })

    html.find('.scar').click(ev => {
      const el = $(ev.currentTarget);
      const scar = this.actor.getOwnedItem(el.data("itemId"));
      scar.sheet.render(true);
    });

    html.find('.scar-delete').click(ev => {
      const scars = this.actor.items.filter(obj => obj.type === 'scar');
      scars.forEach(obj => {
        //this.actor.update({ "data.scar" : obj });
        this.actor.deleteOwnedItem(obj._id);
      });

      this.actor.update({"data.scar": {
        'img': '',
        '_id': '',
        'data': {},
        'name': '',
        'sort': 0,
        'type': '',
        'flags': {}
      }});
    });
  }
  
  _updateObject(event, formData) {
    const regex = /data\.record\[(?<index>\d+)\]\.(?<property>[a-zA-Z_]+)/;
    const record = JSON.parse(JSON.stringify(this.actor.data.data.record));

    for(let data of Object.keys(formData)) {
      const res = regex.exec(data);
      if(res !== null) {
        record[parseInt(res.groups.index)][res.groups.property] = formData[data];
        delete formData[data];
      };
    }

    if(parseInt(formData["data.missiles"]) < 0) delete formData["data.missiles"];
    if(parseInt(formData["data.stars"]) < 0) delete formData["data.stars"];

    formData['data.record'] = record;

    console.log("Event: ", event);
    console.log("Form Data: ", formData);

    this.object.update(formData);
  }
}