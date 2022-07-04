/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Oleksandr Zymohliad (https://sketchfab.com/oleksandr_zymohliad)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/stormtrooper-helmet-78a392d71c3747a5a3b1d35076699048
title: Stormtrooper helmet
*/
import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";

export default function Model({ ...props }) {
  const group = useRef()  
  const { nodes, materials } = useGLTF('/models/helmet/scene.gltf')

  const [colors, setColors] = useState([props.settings.mainColor, props.settings.detailColor ]);
  const [moveCamera, setMoveCamera] = useState(false);

  useEffect(() => {    
    setColors([props.settings.mainColor, props.settings.detailColor ]);
  }, [props.settings ]);

  useEffect(() => {
    setMoveCamera(true);
  }, [props.settings.cameraPos]);

  useFrame((state) => {        
    const sameXPos = Math.round(state.camera.position.x) === props.settings.cameraPos[0];
    const sameYPos = Math.round(state.camera.position.y) === props.settings.cameraPos[1];
    const sameZPos = Math.round(state.camera.position.z) === props.settings.cameraPos[2];

    if (!moveCamera) return;

    if (sameXPos && sameYPos && sameZPos) {
      setMoveCamera(false);
      return;
    }

    const vec = new THREE.Vector3();
    state.camera.lookAt([0, 0, 0]);
    state.camera.position.lerp(
      vec.set(props.settings.cameraPos[0], props.settings.cameraPos[1], props.settings.cameraPos[2]),
      0.1
    );
    state.camera.updateProjectionMatrix();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[-3.36, -4.31, -1.79]}>        
          <mesh geometry={nodes.Object_3.geometry} material={materials.Glasses}/>
          <mesh geometry={nodes.Object_4.geometry} material={materials.Helmet_main} material-color={colors[0]}/>
          <mesh geometry={nodes.Object_5.geometry} material={materials.Plastic} />
          <mesh geometry={nodes.Object_6.geometry} material={materials.Plastic} material-color={colors[1]}/>
          <mesh geometry={nodes.Object_7.geometry} material={materials.Plastic} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/helmet/scene.gltf')