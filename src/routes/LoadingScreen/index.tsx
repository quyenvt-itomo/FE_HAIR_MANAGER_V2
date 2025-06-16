import React, { useEffect, useState } from "react";
import "./index.css";
import { IconLogo } from "../../components/icon/Logo";
import { icons } from "../../assets/icons";

type LoadingScreenProps = {
  isActive: boolean;
  onFinish: () => void;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isActive,
  onFinish,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    if (!isActive) return;

    setProgress(100);
  }, [isActive]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsFading(true);
        setTimeout(onFinish, 900);
      }, 1600);
    }
  }, [progress, onFinish]);

  return (
    <div className={`full-screen ${isFading ? "hide" : ""}`}>
      <div className="top__full-screen flex items-center">
        <img src={icons.logo} className="h-24" />
      </div>
      <div className="bot__full-screen">
        <div className="process-bar">
          <div
            className="process-bar__fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
