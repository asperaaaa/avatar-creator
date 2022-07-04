import { useEffect, useState } from "react";
import { SettingsIds } from "../constants";

export default function Settings({ ...props }) {
  const settings = props.settings;
  const selectedSettings = props.selectedSettings;
  const handleChangeSettings = props.handleChangeSettings;

  const [settingsIndex, setSettingsIndex] = useState(0);

  const updateCameraPos = () => {
    const newSelectedSettings = {
      ...selectedSettings,
      [SettingsIds.cameraPos]:settings[settingsIndex].camera
    };
    handleChangeSettings(newSelectedSettings);
  };

  useEffect(() => {
    updateCameraPos();
  }, [settingsIndex]);

  const changeIndex = (value) => {
    setSettingsIndex(settingsIndex + value);    
  }

  return (
    <div className="settings">
      {settings.map((setting, index) => {
        if (index !== settingsIndex) return;
        return (
          <div key={index} className="setting-block">
            <div className="setting-block__title-wrapper">
              <span
                className={`setting-block__arrows ${
                  settingsIndex > 0 ? "" : "setting-block__arrows--disabled"
                }`}
                onClick={() => {
                  changeIndex(-1);
                }}
              >
                ←
              </span>
              <span className="setting-block__title">{setting.title}</span>
              <span
                className={`setting-block__arrows ${
                  settingsIndex < settings.length - 1
                    ? ""
                    : "setting-block__arrows--disabled"
                }`}
                onClick={() => {
                  changeIndex(1);
                }}
              >
                →
              </span>
            </div>
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
          </div>
        );
      })}
    </div>
  );
}
