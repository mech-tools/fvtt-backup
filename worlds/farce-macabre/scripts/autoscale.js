const scaleFactor = 0.75;
const plates = {
  "Token": "nameplate",
  "Note": "tooltip"
}

const autoScalePlate = (object) => {
  if (object.scene.id !== canvas.scene.id) return;

  const plate = plates[object.constructor.name];

  object[plate].scale.set(scaleFactor / canvas.stage.scale.x);
};

Hooks.on("refreshToken", autoScalePlate);
Hooks.on("refreshNote", autoScalePlate);

