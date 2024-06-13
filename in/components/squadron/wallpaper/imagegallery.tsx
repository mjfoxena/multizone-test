import React, { useState } from "react";
import Modal from "../../molecules/Modal";
import Image from "next/image";
import { API_CONSTANTS } from "../../../services/constants";
import style from "./imagegallery.module.scss";

const baseWallpaperLink = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/homepage/wallpaper`;

const WallpaperGallery = ({ images, isMobile }) => {
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
    // console.log("img url", imageURL)
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
    ? currentImage.orientation === "landscape"
      ? "w-screen h-[90vh]"
      : currentImage.orientation === "potrait"
        ? "w-screen h-[80vh]"
        : "w-auto h-auto"
    : "";
  const mobileSize = currentImage
    ? currentImage.orientation === "potrait"
      ? "w-screen h-[75%]"
      : currentImage.orientation === "landscape"
        ? "w-screen h-auto"
        : "w-screen h-auto"
    : "";

  return (
    <>
      <div className={`${style.wallpaper_container}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${style.wallpaper_item}`}
            onClick={() => onImageClicked(image)}
          >
            <div className="max-w-full border-5">
              <Image
                style={{
                  maxHeight: "100%",
                  borderRadius: "10px",
                }}
                width={3000}
                height={3000}
                src={`${baseWallpaperLink}${image.src}`}
                alt="Ultraviolette squardon"
              />
            </div>
          </div>
        ))}
      </div>

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
            className={`${isMobile ? mobileSize : imageSize} w-[50vw] sm:w-[30vw]`}
          >
            <div className="relative">
              {/* download current image */}
              <div className="download-btn absolute right-2 bottom-2 bg-white p-2 cursor-pointer">
                <Image
                  alt="arrow"
                  width={isMobile ? 10 : 16}
                  height={isMobile ? 10 : 16}
                  style={{ objectFit: "cover" }}
                  src={"/images/icons/download.svg"}
                  onClick={onDownloadImage}
                />
              </div>
              <div className="download-btn absolute right-2 top-2 bg-white p-2 cursor-pointer">
                <Image
                  className="cursor-pointer "
                  onClick={() => setShowModal(false)}
                  src={"/images/icons/cross-black.svg"}
                  width={isMobile ? 10 : 16}
                  height={isMobile ? 10 : 16}
                  alt="close"
                />
              </div>
              <div className="">
                <Image
                  width={2000}
                  height={2000}
                  sizes=""
                  src={currentImage.src}
                  alt=""
                  className={isMobile ? mobileSize : imageSize}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default WallpaperGallery;