import { libWrapper } from './shim.js';

Hooks.once('init', async function () {
    libWrapper.register("wonderwalls", "Wall.prototype.draw", newDraw, "OVERRIDE")
    libWrapper.register("wonderwalls", "Wall.prototype._onUpdate", newUpdate, "OVERRIDE")

    libWrapper.register("wonderwalls", "Wall.prototype.refresh", newRefresh, "OVERRIDE")
});

Hooks.once('ready', async function () {

});



async function newDraw() {
    this.clear();
    this.line = this.addChild(new PIXI.Graphics());
    this.endpoints = this.addChild(new PIXI.Graphics());
    // Draw wall components
    this.directionIcon = this.data.dir ? this.addChild(this._drawDirection()) : null;
    this.visibilityIcon = this.data.sight === 0 ? this.addChild(drawVisibility(this.direction)) : null;
    this.movementIcon = this.data.move === 0 ? this.addChild(drawMovement(this.direction)) : null;

    // Draw a door control icon
    if ( this.isDoor ) this.createDoorControl();

    // Draw current wall
    this.refresh();

    // Enable interactivity, only if the Tile has a true ID
    if (this.id) this.activateListeners();
    return this;
}
function newRefresh() {
    const p = this.coords;
    // x1 + x2, y1 + y2 => x/y
    const mp = [(p[0] + p[2]) / 2, (p[1] + p[3]) / 2];
    const mp1 = [(p[0] + mp[0]) / 2, (p[1] + mp[1]) / 2];
    const mp2 = [(p[2] + mp[0]) / 2, (p[3] + mp[1]) / 2];

    const wc = this._getWallColor();

    // Determine circle radius and line width
    let lw = 2;
    if (canvas.dimensions.size > 150) lw = 4;
    else if (canvas.dimensions.size > 100) lw = 3;
    const cr = this._hover ? lw * 3 : lw * 2;
    let lw3 = lw * 3;

    // Draw background
    this.line.clear()
        .lineStyle(lw3, 0x000000, 1.0)
        .moveTo(p[0], p[1])
        .lineTo(p[2], p[3]);
    this.endpoints.clear()
        .beginFill(0x000000, 1.0)
        .drawCircle(p[0], p[1], cr + lw)
        .drawCircle(p[2], p[3], cr + lw);

    // Draw foreground
    this.line.lineStyle(lw, wc, 1.0)
        .lineTo(p[0], p[1]);
    this.endpoints.beginFill(wc, 1.0)
        .drawCircle(p[0], p[1], cr)
        .drawCircle(p[2], p[3], cr);

    // Tint direction icon
    if (this.directionIcon) {
        this.directionIcon.position.set(mp[0], mp[1]);
        this.directionIcon.tint = wc;
    }
    if (this.visibilityIcon) {
        this.visibilityIcon.position.set(mp1[0], mp1[1]);
        this.visibilityIcon.tint = wc;
    }
    if (this.movementIcon) {
        this.movementIcon.position.set(mp2[0], mp2[1]);
        this.movementIcon.tint = wc;
    }

      // Re-position door control icon
      if ( this.doorControl ) this.doorControl.reposition();

    // Update line hit area
    this.line.hitArea = this._getWallHitPolygon(p, lw3);
    // this.line.beginFill(0x00FF00, 1.0).drawShape(this.line.hitArea).endFill(); // Debug line hit area
    return this;
}

function drawVisibility(direction) {
    // Create the icon
    const eye = PIXI.Sprite.from("modules/wonderwalls/icons/eye-solid.png");
    eye.width = eye.height = 32;

    // Rotate the icon
    let iconAngle = 0;
    let angle = direction;
    eye.anchor.set(0.5, 0.5);
    eye.rotation = iconAngle + angle;
    return eye;
}

function drawMovement(direction) {
    // Create the icon
    const walk = PIXI.Sprite.from("modules/wonderwalls/icons/walking-solid.png");
    walk.width = walk.height = 32

    // Rotate the icon
    let iconAngle = 0;
    let angle = direction;
    walk.anchor.set(0.5, 0.5);
    walk.rotation = iconAngle + angle;
    return walk;
}

function newUpdate(data, ...args) {
    PlaceableObject.prototype._onUpdate.apply(this, args);

    // Re-draw if the direction changed
    if (data.hasOwnProperty("dir") || data.hasOwnProperty("sense") || data.hasOwnProperty("move")) this.draw();

    // If the wall is controlled, update the highlighted segments
    if (this._controlled) {
        canvas.addPendingOperation("WallsLayer.highlightControlledSegments", this.layer.highlightControlledSegments, this.layer);
    }

    // Downstream layer operations
    this.layer._cloneType = this.document.toJSON();

    // // If the type of door or door state has changed also modify the door icon
    const rebuildEndpoints = ["move", "sense", "c"].some(k => k in data);
    const doorChange = this.data.door && (("door" in data) || ("ds" in data));
    if (rebuildEndpoints || doorChange) this._onModifyWall(doorChange);
}