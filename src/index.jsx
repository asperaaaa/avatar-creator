import { Camera, Matrix4 } from "three";
import { render } from "react-dom";
import { Suspense, useState, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";

import style from "./style.css";
import Helmet from "./components/Helmet";
import Settings from "./components/Settings";
import Lights from "./components/Lights";
import { SettingsConst, SettingsIds } from "./constants";

function Screenshot(props) {
  const { gl, scene, camera } = useThree();
  const virtualCam = new Camera();
  scene.add(virtualCam); 
  const matrix = new Matrix4();
  
  useFrame(() => {
    // matrix.copy(camera.matrix).invert();
    virtualCam.clone(camera);
    // virtualCam.quaternion.setFromRotationMatrix(matrix);
    console.log('virtualCam',virtualCam)
    console.log('camera',camera)
  });
  props.callback(gl, scene, virtualCam);
  // props.callback(gl, scene, camera);
 
  return null;
}

function App() {
  let gl, scene, camera;
  const settings = SettingsConst;

  const [selectedSettings, setSelectedSettings] = useState({
    [SettingsIds.mainColor]: "#FFFFFF",
    [SettingsIds.detailColor]: "#030303",
    [SettingsIds.backgroundColor]: "#E3E3E3",
    [SettingsIds.lightsColor]: "#E3E3E3",
    [SettingsIds.cameraPos]: [14, 4, 18],
  });

  const handleChangeSettings = (newSelectedSettings) => {
    setSelectedSettings(newSelectedSettings);
  };

  const takeScreenshot = () => {
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
  };

  return (
    <>
      <div
        onClick={() => {
          takeScreenshot();
        }}
      >
        {JSON.stringify(selectedSettings)}
      </div>
      <Canvas dpr={[1, 2]} camera={{ position: [-3, 3, 3], fov: 35 }}>
        <Screenshot
          callback={(_gl, _scene, _camera) => {
            gl = _gl;
            scene = _scene;
            camera = _camera;
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
