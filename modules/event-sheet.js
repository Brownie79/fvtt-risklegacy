export class EventItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["risk", "territory", "coin"],
      template: "systems/risklegacy/templates/img_vertical.html",
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
  }

  _updateObject(event, formData) {
    this.object.update(formData);
  }
}
