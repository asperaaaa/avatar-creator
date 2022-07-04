const materialColorsConst = [
  "#030303",
  "#123B74",
  "#265828",
  "#950000",
  "#B34C00",
  "#800080",
  "#FFFFFF",
];

const sceneColorsConst = [
  "#030303",
  "#123B74",
  "#265828",
  "#950000",
  "#B34C00",
  "#800080",
  "#E3E3E3",
];

export const SettingsIds = {
  mainColor: "mainColor",
  detailColor: "detailColor",
  backgroundColor: "backgroundColor",
  lightsColor: "lightsColor",
  cameraPos: "cameraPos",
};

export const SettingsConst = [
  {
    id: SettingsIds.mainColor,
    title: "MAIN 1/4",
    colors: materialColorsConst,
    camera: [14, 4, 18],
  },
  {
    id: SettingsIds.detailColor,
    title: "DETAIL 2/4",
    colors: materialColorsConst,
    camera: [-14, 2, 10],
  },
  {
    id: SettingsIds.backgroundColor,
    title: "BACKGROUND 3/4",
    colors: sceneColorsConst,
    camera: [0, 10, 20],
  },
  {
    id: SettingsIds.lightsColor,
    title: "LIGHTS 4/4",
    colors: sceneColorsConst,
    camera: [0, 10, 20],
  },
];

export const LightsPositionsConst = [
  [10, 10, 10],
  [-10, 10, 10],
  [(10, 10, -10)],
  [(-10, 10, -10)],
];
