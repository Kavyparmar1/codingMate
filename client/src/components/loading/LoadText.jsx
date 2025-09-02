import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";

const LoadText = () => {
  const loaderWhite = useRef(null);
  const loaderWhite1 = useRef(null);
  const widthRef = useRef(null);
  const percentRef = useRef(null);

  const [loaderCount, setLoaderCount] = useState(0);

  // GSAP Animations
  useGSAP(() => {
    gsap.to(loaderWhite.current, {
      color: "black",
      duration: 5,
      delay: 1,
      ease: "power2.inOut",
      y: -1000,
    });
    gsap.to(loaderWhite1.current, {
      color: "black",
      duration: 5,
      delay: 1,
      ease: "power2.inOut",
      y: -1000,
    });
  });

  // Loader Increment Logic
  useEffect(() => {
    if (loaderCount < 100) {
      const timer = setTimeout(() => {
        setLoaderCount((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [loaderCount]);

  // Width & Percent update
  useEffect(() => {
    if (widthRef.current) {
      widthRef.current.style.width = `${loaderCount}%`;
    }
    if (percentRef.current) {
      percentRef.current.innerText = `${loaderCount}%`;
    }
  }, [loaderCount]);

  return (
    <>
      <div className="h-2 rounded-xl w-full bg-black fixed">
        <div
          ref={widthRef}
          className="loadingdiv h-full w-10 rounded-xl bg-white"
        ></div>
      </div>
      <div className="flex items-center flex-col justify-center h-full bg-black text-white">
        <h1
          ref={loaderWhite}
          className="hero font-[hero] text-6xl"
        >
          Igniting Productivity Mode...
        </h1>
        <br />
        <h4 ref={percentRef} className="text-2xl">
          00%
        </h4>
      </div>
    </>
  );
};

export default LoadText;
