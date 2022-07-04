import { render } from "react-dom";
import { Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import style from "./style.css";
import Helmet from "./components/Helmet";
import Settings from "./components/Settings";
import Lights from "./components/Lights";
import { SettingsConst, SettingsIds } from "./constants";

function Screenshot(props) {
  const { gl, scene, camera, size } = useThree();
  props.callback(gl, scene, camera, size);
  return null;
}

function App() {
  let gl, scene, camera, size;
  const settings = SettingsConst;

  const [selectedSettings, setSelectedSettings] = useState({
    [SettingsIds.mainColor]: "#FFFFFF",
    [SettingsIds.detailColor]: "#030303",
    [SettingsIds.backgroundColor]: "#E3E3E3",
    [SettingsIds.lightsColor]: "#E3E3E3",
  });

  const handleChangeSettings = (newSelectedSettings) => {
    setSelectedSettings(newSelectedSettings);
  };

  const takeScreenshot = () => {    
    const oldCameraAspect = camera.aspect;

    gl.setSize(1080,1080);
    camera.aspect = 1;
    camera.updateProjectionMatrix();

    gl.render(scene, camera);
    const link = document.createElement("a");
    link.setAttribute("download", "avatar.png");
    link.setAttribute(
      "href",
      gl.domElement
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
    );
    link.click();

    gl.setSize(size.width, size.height);   
    camera.aspect = oldCameraAspect;
    camera.updateProjectionMatrix();
  };

  return (
    <>
      <div
        className="download"
        onClick={() => {
          takeScreenshot();
        }}
      >
        DOWNLOAD AVATAR
      </div>
      <Canvas dpr={[1, 2]} camera={{ fov: 35 }}>
        <Screenshot
          callback={(_gl, _scene, _camera, _size) => {
            gl = _gl;
            scene = _scene;
            camera = _camera;
            size = _size;
          }}
        />
        {selectedSettings && (
          <>
            <color
              attach="background"
              args={[selectedSettings.backgroundColor]}
            />
            <Helmet position={[0, -1, 0]} settings={selectedSettings} />
            <Lights color={selectedSettings.lightsColor} />
          </>
        )}
        <Environment preset="studio" />
        <OrbitControls enablePan={false} enableZoom={true} />
      </Canvas>
      <Settings
        settings={settings}
        selectedSettings={selectedSettings}
        handleChangeSettings={handleChangeSettings}
      />
    </>
  );
}

render(
  <Suspense fallback={null}>
    <App />
  </Suspense>,
  document.querySelector("#root")
);
