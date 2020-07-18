/**
 * @extends {ActorSheet}
 */

export class FactionActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["risk"],
      template: "systems/risklegacy/templates/faction-sheet.html",
      width: 620,
      height: 600,
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
    console.log("Event: ", event);
    console.log("Form Data: ", formData);

    this.object.update(formData);
  }
}
