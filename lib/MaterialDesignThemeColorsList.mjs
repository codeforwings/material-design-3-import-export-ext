/**
 * neutral is not used atm for now. it's w/e their seed is
 */
/**
 * Picking tertiary colors
 * @type {{tertiaryColors: string[], primaryColor: string}}
 */
const matchTColors = {
  "primaryColor": "#cba642",
  "tertiaryColors": [
    "#CBA642",
    "#A6BA42",
    "#42BA9F",
    "#426CBA",
    "#9F42BA",
    "#BA6242"
  ]
}
/** @type {MaterialThemeCoreColors} */
const DefaultCoreColors = {
  primary: '#6750A4',
  secondary: '#958DA5',
  tertiary: '#B58392',
  neutral: '#939094',
};
// newcolor:"#938f94"

/** @type {MaterialThemeCoreColors} */
const sampleCoreColorsTheme = {
  primary:   '#CBA642',
  secondary: '#8B90A5',
  tertiary:  '#426CBA',
  neutral:   '#959088',
};
/** @type {MaterialThemeCoreColors[]} */
export const CoreColorsScreenShotList = [
  sampleCoreColorsTheme,//original
  {
    primary:   '#CBA642',
    secondary: '#8B90A5',
    tertiary:  '#a6ba42',
    neutral:   '#959088',
  },
    {
    primary:   '#CBA642',
    secondary: '#8B90A5',
    tertiary:  '#42BA9F',
    neutral:   '#959088',
  },
    {
    primary:   '#CBA642',
    secondary: '#8B90A5',
    tertiary:  '#9F42BA',
    neutral:   '#959088',
  },
    {
    primary:   '#CBA642',
    secondary: '#8B90A5',
    tertiary:  '#BA6242',
    neutral:   '#959088',
  },
  DefaultCoreColors,//default as reference
]

// console.log(CoreColorsScreenShotList);