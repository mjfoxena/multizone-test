import React, { useState } from "react";
import Modal from "../../Modal";
import Image from "next/image";
// import Masonry from "react-masonry-css";
// import Style from "../../../../pages/squadron/squadron.module.scss";
import { API_CONSTANTS } from "../../../../services/constants";

const baseWallpaperLink = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/wallpaper`;

const SquadronGallery = ({ images, isMobile }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState<any>();

  const onImageClicked = (image) => {
    const c = { ...image };
    c.src = `${baseWallpaperLink}${image.src}`;
    setCurrentImage(c);
    setShowModal(true);
  };

  const onDownloadImage = () => {
    const imageURL = currentImage.src;
    let alink = document.createElement("a");
    alink.href = imageURL;
    const s = imageURL.split("/");
    const fileName = s[s.length - 1];

    fetch(imageURL)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);

        alink.href = blobUrl;
        alink.download = fileName;
        alink.click();

        URL.revokeObjectURL(blobUrl);
      });
  };

  const imageSize = currentImage
    ? currentImage.orientation === "portrait"
      ? "h-screen"
      : currentImage.orientation === "landscape"
      ? "w-screen h-screen"
      : "w-auto h-screen"
    : "";
  const mobileSize = currentImage
    ? currentImage.orientation === "portrait"
      ? "w-screen h-screen"
      : currentImage.orientation === "landscape"
      ? "w-screen h-auto"
      : "w-screen h-auto"
    : "";

  return (
    <>
      {/* <Masonry
        breakpointCols={4}
        className={Style["my-masonry-grid"]}
        columnClassName={Style["my-masonry-grid_column"]}
      >
        {images.map((image, index) => (
          <div key={index} onClick={() => onImageClicked(image.src)}>
            <img
              src={`${baseWallpaperLink}${image.src}`}
              alt={image.alt}
              className=" rounded-lg"
            />{" "}
          </div>
        ))}
      </Masonry> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-sc">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative"
            onClick={() => onImageClicked(image)}
          >
            <img
              src={`${baseWallpaperLink}${image.src}`}
              alt=""
              className="h-auto max-w-full rounded-lg"
            />{" "}
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="">
          {images.grid1.map((image, idx) => (
            <div
              key={idx}
              className="mb-4"
              onClick={() => onImageClicked(image.src)}
            >
              <img
                src={`${baseWallpaperLink}${image.src}`}
                alt=""
                className="h-auto max-w-full rounded-lg"
              />
            </div>
          ))}
        </div>
       
        <div className=" gap-4">
          {images.grid2.map((image, idx) => (
            <div
              key={idx}
              className="mb-4"
              onClick={() => onImageClicked(image.src)}
            >
              <img
                key={idx}
                src={`${baseWallpaperLink}${image.src}`}
                alt=""
                className="h-auto max-w-full rounded-lg"
              />
            </div>
          ))}
        </div>

      
        <div className=" gap-4">
          {images.grid3.map((image, idx) => (
            <div
              key={idx}
              className="mb-4"
              onClick={() => onImageClicked(image.src)}
            >
              <img
                key={idx}
                src={`${baseWallpaperLink}${image.src}`}
                alt=""
                className="h-auto max-w-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div> */}

      {/* Modal */}
      {showModal && currentImage.length !== 0 && (
        <Modal
          state={showModal}
          stateHandler={(v) => {
            if (!v) {
              setShowModal(false);
            }
          }}
          closeOnClickOutside
          style={{
            background: "#000000BE",
          }}
          className=""
          hasWidth
        >
          <div
            className={`${
              isMobile ? mobileSize : imageSize
            } mx-3 sm:mx-0 bg-white shadow-xl dark:shadow-black`}
          >
            <div className=" relative">
              <div
                className="download-btn absolute right-2 bottom-2 bg-white p-2 cursor-pointer"
                onClick={onDownloadImage}
              >
                <Image
                  alt="arrow"
                  width={isMobile ? 15 : 32}
                  height={isMobile ? 15 : 32}
                  style={{ objectFit: "cover" }}
                  src={"/images/icons/download.svg"}
                />
              </div>
              <div className="download-btn absolute right-2 top-2 bg-white p-2 cursor-pointer">
                <Image
                  className="cursor-pointer "
                  onClick={() => setShowModal(false)}
                  src={"/images/icons/cross-black.svg"}
                  width={isMobile ? 15 : 32}
                  height={isMobile ? 15 : 32}
                  alt="close"
                />
              </div>

              <img
                src={currentImage.src}
                className={isMobile ? mobileSize : imageSize}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SquadronGallery;
