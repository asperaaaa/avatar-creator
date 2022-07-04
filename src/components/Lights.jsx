import React, { useState, useEffect } from "react";

import { LightsPositionsConst } from "../constants";

export default function Lights({ ...props }) {
  const positions = LightsPositionsConst;

  const [color, setColor] = useState(props.color);
  
  useEffect(() => {
    setColor(props.color);    
  }, [props.color]);
    
  return (
    <>
      {positions.map((pos, i) => (
        <spotLight
          key={i}
          position={positions[i]}
          intensity={0.75}
          angle={0.5}
          penumbra={1}
          color={color}
        />
      ))}
    </>
  );
}
