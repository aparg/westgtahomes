import { residential } from "../api/routes/fetchRoutes";

export const generateImageURLs = (id, photoCount) => {
  const images = [];

  for (let i = 1; i <= 10; i++) {
    if (i <= photoCount) {
      const mapObj = {
        MLS: id,
        index: i,
      };

      const imgSrc = residential.photos.replace(
        /MLS|index/gi,
        function (matched) {
          return mapObj[matched];
        }
      );

      images.push(imgSrc);
    } else {
      images.push(null);
    }
  }

  return images;
};
