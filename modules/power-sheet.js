export class PowerItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["risk"],
      template: "systems/risklegacy/templates/power-sheet.html",
      width: 600,
      height: 300,
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
