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
  "#222222",
  "#1E90FF",
  "#51FF00",  
  "#ff1100",
  "#FF6A00",
  "#8F00FF",
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
    title: "MAIN",
    colors: materialColorsConst,
    camera: [14, 4, 18],
  },
  {
    id: SettingsIds.detailColor,
    title: "DETAIL",
    colors: materialColorsConst,
    camera: [-14, 2, 10],
  },
  {
    id: SettingsIds.backgroundColor,
    title: "BACKGROUND",
    colors: sceneColorsConst,
    camera: [0, 10, 20],
  },
  {
    id: SettingsIds.lightsColor,
    title: "LIGHTS",
    colors: sceneColorsConst,
    camera: [0, 2, 20],
  },
  {
    id: 'download',
    title: "DOWNLOAD",    
    camera: [0, 2, 20],
  },
];

export const LightsPositionsConst = [
  [10, 10, 10],
  [-10, 10, 10],
  [(10, 10, -10)],
  [(-10, 10, -10)],
];
