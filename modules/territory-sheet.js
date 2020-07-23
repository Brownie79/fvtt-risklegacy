export class TerritoryItemSheet extends ItemSheet {
    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["risk", "territory"],
        template: "systems/risklegacy/templates/territory-sheet.html",
        width: 448,
        height: 635,
      });
    }
  
    /** @override */
    getData() {
      const data = super.getData();
      return data;
    }
  
  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find('.territory-plus').click(ev => {
      this.addCoin();
    });

    html.find('.territory-minus').click(ev => {
      this.removeCoin();
    });
  }
  
    _updateObject(event, formData) {
      this.object.update(formData);
    }

    addCoin() {
      const value = this.item.data.data.value <= 1 ? 2 : this.item.data.data.value >= 5 ? 6 : this.item.data.data.value + 1;
      this.item.update({"data.value": value});
    }

    removeCoin() {
      const value = this.item.data.data.value <= 2 ? 1 : this.item.data.data.value >= 6 ? 5 : this.item.data.data.value - 1;
      this.item.update({"data.value": value});
    }
  }
  