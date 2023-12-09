export const DEFAULT_ACTIVE_EFFECT_CONFIG = {
  id: '',
  label: '',
  expression: '',
  codeExp: '',
  imgName: '',
  imgSrc: '',
  priority: 50,
  config: null,
  overlay: false,
  alwaysOn: false,
  tokens: undefined,
  disabled: false,
  overlayConfig: null,
  targetActors: null,
  group: 'Default',
};

// export const IDEAL_OVERLAY_CONFIG = {
//   images: [], //img
//   texts: [], //text
//   shapes: [],
//   appearances: [],
// };

// const IMG_CONFIG = {
//   src: '', //img
//   linked: false, //imgLinked
//   repeating: false,
//   repeat: null,
// };

export const DEFAULT_OVERLAY_CONFIG = {
  img: '',
  imgLinked: false,
  alpha: 1,
  scaleX: 1,
  scaleY: 1,
  offsetX: 0,
  offsetY: 0,
  angle: 0,
  filter: 'NONE',
  filterOptions: {},
  inheritTint: false,
  top: false,
  bottom: false,
  underlay: false,
  linkRotation: true,
  linkMirror: true,
  linkOpacity: false,
  linkScale: true,
  linkDimensionX: false,
  linkDimensionY: false,
  linkStageScale: false,
  mirror: false,
  tint: null,
  loop: true,
  playOnce: false,
  animation: {
    rotate: false,
    duration: 5000,
    clockwise: true,
    relative: false,
  },
  limitedUsers: [],
  limitedToOwner: false,
  limitOnProperty: '',
  alwaysVisible: false,
  text: {
    text: '',
    align: CONFIG.canvasTextStyle.align,
    fontSize: CONFIG.canvasTextStyle.fontSize,
    fontFamily: CONFIG.canvasTextStyle.fontFamily,
    fill: CONFIG.canvasTextStyle.fill,
    dropShadow: CONFIG.canvasTextStyle.dropShadow,
    strokeThickness: CONFIG.canvasTextStyle.strokeThickness,
    stroke: CONFIG.canvasTextStyle.stroke,
    curve: { angle: 0, radius: 0, invert: false },
    letterSpacing: CONFIG.canvasTextStyle.letterSpacing,
    repeating: false,
    wordWrap: false,
    wordWrapWidth: 200,
    breakWords: false,
    maxHeight: 0,
  },
  parentID: '',
  id: null,
  anchor: { x: 0.5, y: 0.5 },
  shapes: [],
  variables: [],
  interactivity: [],
  ui: false,
};

export const OVERLAY_SHAPES = {
  Rectangle: {
    type: 'rectangle',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    radius: 0,
    repeating: false,
  },
  Ellipse: {
    type: 'ellipse',
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    repeating: false,
  },
  Polygon: {
    type: 'polygon',
    x: 0,
    y: 0,
    points: '0,1,0.95,0.31,0.59,-0.81,-0.59,-0.81,-0.95,0.31',
    scale: 50,
    repeating: false,
  },
  Torus: {
    type: 'torus',
    x: 0,
    y: 0,
    innerRadius: 50,
    outerRadius: 100,
    startAngle: 0,
    endAngle: 180,
    repeating: false,
  },
};

export const CORE_SHAPE = {
  line: {
    width: 1,
    color: '#000000',
    alpha: 1,
  },
  fill: { color: '#ffffff', color2: '', prc: '', alpha: 1 },
};
