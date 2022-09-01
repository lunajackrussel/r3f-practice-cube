import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Torus } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { TextureLoader } from "three";
import imageUrl from "./assets/tex.jpg";
import "./App.css";

const Cube = (props) => {
  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0,
  });

  // const { size, x } = {
  //   size: isBig ? [2, 2, 2] : [1, 1, 1],
  //   x: isBig ? 2 : 0,
  // };
  const color = isHovered ? "hotpink" : "orange";
  const texture = useLoader(TextureLoader, imageUrl);

  return (
    <a.mesh
      {...props}
      ref={ref}
      scale={size}
      position-x={x}
      onClick={() => setIsBig(!isBig)}
      onPointerOver={() => setIsHovered(false)}
      onPointerOut={() => setIsHovered(true)}
      castShadow
      receiveShadow
    >
      <sphereBufferGeometry attach="geometry" args={[1, 6, 8]} />
      <meshPhongMaterial
        map={texture}
        roughness={1}
        metalness={0.5}
        shininess={0.5}
        attach="material"
        flatShading={true}
      />
    </a.mesh>
  );
};

const Plane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
};
//box args = [width, height, depth]
// sphere args = [radius, segmentsWidth, segmentsHeight]
const Scene = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <spotLight intensity={0.6} position={[0, 5, 3]} castShadow />
      <Suspense fallback={null}>
        <Cube rotation={[10, 10, 0]} position={[0, 0, 0]} />
      </Suspense>
      <Suspense fallback={null}>
        {" "}
        <Cube rotation={[10, 20, 0]} position={[2, 2, 0]} />
      </Suspense>
      <Torus args={[1, 0.2, 10, 30]} position={[-2, 0, 0]}>
        <meshPhysicalMaterial
          roughness={1}
          metalness={0.5}
          clearcoat={0.5}
          attach="material"
          color="blue"
        />
      </Torus>
      <Plane />
    </>
  );
};

const App = () => {
  return (
    <Canvas shadows={true}>
      <Scene />
    </Canvas>
  );
};

export default App;

// useSpringについて
// https://qiita.com/uehaj/items/260f188851045cc091ac
