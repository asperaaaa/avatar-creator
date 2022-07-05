import { useEffect, useState } from "react";
import { SettingsIds } from "../constants";

import downloadIcon from "/download.svg";
import leftArrow from "/leftArrow.svg";
import rightArrow from "/rightArrow.svg";

export default function Settings({ ...props }) {
  const settings = props.settings;
  const selectedSettings = props.selectedSettings;
  const handleChangeSettings = props.handleChangeSettings;
  const takeScreenshot = props.takeScreenshot;

  const [settingsIndex, setSettingsIndex] = useState(0);

  const updateCameraPos = () => {
    const newSelectedSettings = {
      ...selectedSettings,
      [SettingsIds.cameraPos]: settings[settingsIndex].camera,
    };
    handleChangeSettings(newSelectedSettings);
  };

  useEffect(() => {
    updateCameraPos();
  }, [settingsIndex]);

  const changeIndex = (value) => {
    setSettingsIndex(settingsIndex + value);
  };

  return (
    <div className="settings">
      <div className="settings-progess" style={{width:`${(settingsIndex/(settings.length-1))*100}%`}}></div>
      {settings.map((setting, index) => {
        if (index !== settingsIndex) return;
        return (
          <div key={index} className="setting-block">
            <img
              src={leftArrow}
              className={`setting-block__arrows ${
                settingsIndex > 0 ? "" : "setting-block__arrows--disabled"
              }`}
              onClick={() => {
                changeIndex(-1);
              }}
            />
            <div className="setting-block__center">
              {setting.title}
              {index === settings.length - 1 ? (
                <img
                  onClick={() => {
                    takeScreenshot();
                  }}
                  className="download-icon"
                  src={downloadIcon}
                />
              ) : (
                <div className="setting-block__colors-wrapper">
                  {setting.colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => {
                        const newSelectedSettings = { ...selectedSettings };
                        newSelectedSettings[setting.id] = color;
                        handleChangeSettings(newSelectedSettings);
                      }}
                      className={`setting-block__color ${
                        selectedSettings[setting.id] === color
                          ? "setting-block__color--selected"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
            <img
              src={rightArrow}
              className={`setting-block__arrows ${
                settingsIndex < settings.length - 1
                  ? ""
                  : "setting-block__arrows--disabled"
              }`}
              onClick={() => {
                changeIndex(1);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
