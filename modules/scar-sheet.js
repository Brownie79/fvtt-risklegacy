export class ScarItemSheet extends ItemSheet {
    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["risk", "scar-sheet"],
        template: "systems/risklegacy/templates/scar-sheet.html",
        width: 620,
        height: 472
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
    }
  
    _updateObject(event, formData) {
      this.object.update(formData);
    }
  }
  