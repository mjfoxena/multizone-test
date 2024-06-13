import { Carousel } from "react-responsive-carousel";
import Style from "../variant.module.scss";
import Image from "next/image";
import {
  BikeLabelMap,
  GetShortcodeSequence,
  VariantLabelMap,
} from "../../../constants/configSelectionImageMap";
import { useRouter } from "next/router";
import { ConfigCombination } from "../../../queries/config";
import { useContext, useEffect, useState, useCallback } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { configure } from "../../../constants/raw_data";

const CarouselIndicator = (clickHandler, isSelected, index, label) => {
  return (
    <div
      onClick={clickHandler}
      className={`carousel-indicator ${isSelected && "indicator-active"}`}
    />
  );
};

export const ConfigCarousel = ({ selectedItems, finalModal, limited_type }) => {
  const { query } = useRouter();

  const [selectedItem, setSelectedItem] = useState(0);

  const { userData, isMobile } = useContext(NavbarContext);

  const [selectedAccessory, setSelectAccessory] = useState<any[]>([]);

  const [newTargetImages, setNewTargetImages] = useState<any[]>([]);

  const [data, setData] = useState<any>({});

  useEffect(() => {
    (async () => {
      if (finalModal) {
        setData(await ConfigCombination(finalModal));
      }
    })();
  }, [finalModal]);

  const selectedVariant =
    selectedItems?.find((e) => e.category === "variant")?.short_code || "";

  const shortCodeSequence = GetShortcodeSequence(
    selectedItems
      ?.filter((e) => e?.short_code && e.category !== "variant")
      .map((e) => e.short_code) || []
  );

  // console.log("##" ,selectedVariant)
  // console.log("##" ,limited_type)
  // console.log("##" ,finalModal)

  const mainPath = `${limited_type === "space" && finalModal === "limited" ? "space" : BikeLabelMap[finalModal as string]}${
    finalModal === "limited" ? "" : `/${VariantLabelMap[selectedVariant]}`
  }${shortCodeSequence ? `/${shortCodeSequence}` : ""}`;

  console.log(mainPath);
  

  let targetImages = data?.data?.image_config?.[mainPath] || [];

  console.log("## ", mainPath)



  useEffect(() => {
    setNewTargetImages([]);
    if (selectedAccessory) {
      console.log("selectedAccessory", selectedAccessory)
      addNewTargetImages(selectedAccessory);
    }
  }, [selectedAccessory]);

  useEffect(() => {
    if (selectedItems) {
      let temp: any[] = [];
      selectedItems.forEach((item) => {
        temp.push(item);
      });
      const selectedAccessory = temp.find((val) => val?.category === "accessory");
      if (selectedAccessory) {
        setSelectAccessory(selectedAccessory);
      }
    }
  }, [selectedItems]);

  const addNewTargetImages = (type) => {
    if(finalModal){
      const selectedTypeImageData = configure[finalModal]?.find((val) => val.name === type.name);
      // console.log("+++ ",finalModal)
      const newImageList = selectedTypeImageData?.imagesList;
      if (newImageList !== undefined) {
        setTimeout(() => {
          for (let image of newImageList) {
            setNewTargetImages((prev) => [...prev, image]);
          }
        }, 100);
      }
    }
  };

  // extra laser images 
  // if ( finalModal === "laser" ) {
  //   targetImages = [...targetImages, ...newTargetImages];
  // }
  
  useEffect(() => {
    setSelectedItem((i) => {
      if (i > targetImages.length && targetImages.length) {
        return targetImages.length - 1;
      }
      return i;
    });
    // console.log("###targetImage", targetImages);
  }, [targetImages]);

  return (
    <div className="relative">
      <div
        className="absolute right-4 z-50 cursor-pointer"
        style={{ top: "48%" }}
        onClick={() =>
          selectedItem < targetImages.length - 1 &&
          setSelectedItem((e) => e + 1)
        }
      >
        <Image
          alt="carousel-control"
          src={"/images/icons/carousel-arrow.svg"}
          height={isMobile ? 24 : 40}
          width={isMobile ? 24 : 40}
        />
      </div>
      <div
        className="absolute left-4 z-50 cursor-pointer rotate-180"
        style={{ top: "48%" }}
        onClick={() => selectedItem > 0 && setSelectedItem((e) => e - 1)}
      >
        <Image
          alt="carousel-control"
          src={"/images/icons/carousel-arrow.svg"}
          height={isMobile ? 24 : 40}
          width={isMobile ? 24 : 40}
        />
      </div>
      <Carousel
        renderIndicator={CarouselIndicator}
        selectedItem={selectedItem}
        onChange={(e) => {
          setSelectedItem(e);
        }}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        swipeable
        axis="horizontal"
      >
        {targetImages.map((img, i) => {
          return (
            <div className={Style.carouselWrapper} key={i}>
              <div
                className=""
                style={{ height: "calc(100vh - 64px)", width: "100%" }}
              >
                <Image
                  style={{ objectFit: "cover" }}
                  fill
                  src={`${data?.data?.base_url}${img}`}
                  alt="carousel"
                />
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
