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
    if ( !data.data.scar && scars.length > 0 ) data.data.scar = scars[0];
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

    html.find('.scar').click(ev => {
      const el = $(ev.currentTarget);
      const scar = this.actor.getOwnedItem(el.data("itemId"));
      scar.sheet.render(true);
    });
  }


  
  _updateObject(event, formData) {
    console.log("Event: ", event);
    console.log("Form Data: ", formData);

    this.object.update(formData);
  }
}