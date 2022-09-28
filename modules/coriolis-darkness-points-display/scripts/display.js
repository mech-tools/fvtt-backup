export class DarknessPointDisplay extends Application {
  static initialize() {
    this.dpDisplay = new DarknessPointDisplay();
  }

  static update() {
    this.dpDisplay.update();
  }

  static render() {
    this.dpDisplay.render(true);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "coriolis-darness-points-display",
      template:
        "modules/coriolis-darkness-points-display/templates/counter.hbs",
      top: 100,
      left: 100,
      height: 120,
      resizable: false,
      popout: false,
      title: game.i18n.localize("window-title"),
    });
  }

  total = 0;

  constructor() {
    super();
  }

  activateListeners(html) {
    super.activateListeners(html);
  }

  getData() {
    return {
      dp: this.total,
    };
  }

  update() {
    const currentTotal = this._getDarknessPointTotal();
    if (currentTotal != this.total) {
      this.total = currentTotal;
      if (this.rendered) {
        this.render(true);
      }
    }
  }

  _getDarknessPointTotal() {
    let total = 0;
    for (let userId of game.users.keys()) {
      total += this._getDarknessPointsForUserId(userId);
    }
    return total;
  }

  _getDarknessPointsForUserId(userId) {
    let user = game.users.get(userId);
    let dPoints = user.getFlag("yzecoriolis", "darknessPoints");
    return dPoints ? dPoints.value : 0;
  }
}
