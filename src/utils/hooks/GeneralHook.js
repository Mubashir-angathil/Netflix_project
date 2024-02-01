import { useState } from "react";

export const useGeneralHook = () => {
  const [averageColor, setAverageColor] = useState();

  const getAverageColor = async (imageSrc) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";

    image.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = this.width;
      canvas.height = this.height;
      context.drawImage(this, 0, 0);

      const imageData = context.getImageData(
        0,
        0,
        this.width,
        this.height
      ).data;

      let totalRed = 0;
      let totalGreen = 0;
      let totalBlue = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        totalRed += imageData[i];
        totalGreen += imageData[i + 1];
        totalBlue += imageData[i + 2];
      }

      const averageRed = Math.round(totalRed / (imageData.length / 4));
      const averageGreen = Math.round(totalGreen / (imageData.length / 4));
      const averageBlue = Math.round(totalBlue / (imageData.length / 4));

      const averageColor = `rgba(${averageRed}, ${averageGreen}, ${averageBlue}, 0.84)`;
      setAverageColor(averageColor);
    };

    image.src = imageSrc;
  };

  const calculateRuntime = (runtimeInHour) => {
    const hours = Math.floor(runtimeInHour / 60);
    const minutes = Math.floor(runtimeInHour % 60);

    return { hours, minutes };
  };

  const convertVoteToPercentage = (vote) => {
    return (vote * 10).toFixed(2); // TMDB votes are on a scale of 0 to 10
  };

  return {
    averageColor,
    getAverageColor,
    calculateRuntime,
    convertVoteToPercentage,
  };
};
