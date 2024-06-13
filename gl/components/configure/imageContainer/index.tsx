import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import CompareVariants from "../../../containers/variants/sections/CompareVariants";
import PotentitalSavings from "../../../containers/variants/sections/PotentialSavings";
import { NavbarContext } from "../../../contexts/NavbarContext";
import style from "../../../pages/configure/map.module.scss";
import { NewConfigImages } from "../../../queries/config";
import {
  API_CONSTANTS,
  ConfiguratorConstants,
} from "../../../services/constants";
import useOutsideClick from "../../../utils/hooks/useOutsideClick";
import { calculateMonthlyEmi, formatPrice } from "../../../utils/utils";
import ConfigureSideTabs from "../../atoms/SideTabs/configureSideTabs";
import Modal from "../../molecules/Modal";
import SideTab from "../sidetabs";
import BasicImages from "./basicImages";
const imageVideoUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/limited/space_edition/landing.mp4`;

gsap.registerPlugin(ScrollTrigger);

export const sidebarSteps = {
  sidebarStep1: "sidebarStep1",
  compareVariants: "compareVariants",
  potentialSavings: "potentialSavings",
};

const ConfigImageContainer = ({
  selectedVariant,
  onPersonalitySelected,
  selectedModel,
  setSelectedModelList,
  reconSelections,
  originalSelections,
  renderSection,
  setRenderSection,
  updatedPricing,
}) => {
  const { sidebarOpen, isMobile, userData } = useContext(NavbarContext);
  const [isControlsVisible, setControlsVisible] = useState(false);
  const [imagescollection, setImagescollection] = useState<any>({});
  const [targetImages, setTargetImages] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [sidebarTab, setSidebarTab] = useState(sidebarSteps.sidebarStep1);
  const [currentTab, setCurrentTab] = useState(
    selectedVariant === "Recon" ? 1 : 0
  );

  const handleTabSelect = (index) => {
    setCurrentTab(index);
    const selectedItem = index === 1 ? "Recon" : "Original";
    setSelectedModelList(selectedItem);
  };

  // Handle images retrieval
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await NewConfigImages();
        setImagescollection(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (imagescollection && imagescollection.data) {
      const { base_url, image_config } = imagescollection?.data;
      setTargetImages(image_config);
      console.log("targetVideos", image_config);
    }
  }, [imagescollection]);

  let selectedImages: string[] = [];
  let altText = "";
  let className = "";
  let isCarousel: boolean = false;

  if (renderSection === "IN") {
    selectedImages = targetImages[`${onPersonalitySelected}/${selectedModel}`];
    altText = "carousel 1";
    className = "";
    isCarousel = true;
  } else if (renderSection === "PP") {
    selectedImages = targetImages[`${onPersonalitySelected}/${selectedModel}`];
    altText = "section 2";
    className = "one";
    isCarousel = true;
  } else if (renderSection === "DS") {
    selectedImages = targetImages[`${onPersonalitySelected}/${selectedModel}`];
    altText = "section 3";
    className = "two";
    isCarousel = true;
  } else if (renderSection === "CH") {
    selectedImages =
      targetImages[`${onPersonalitySelected}/${selectedModel}/CH`];
    console.log(" CH renderSection ", selectedImages);

    altText = "section 4";
    className = "three";
    isCarousel = false;
  } else if (renderSection === "SE") {
    selectedImages =
      targetImages[`${onPersonalitySelected}/${selectedModel}/SP`];
    altText = "section 5";
    className = "four";
    isCarousel = false;
  } else if (renderSection === "UP") {
    selectedImages = targetImages[`${onPersonalitySelected}/${selectedModel}`];
    altText = "section 6";
    className = "five";
    isCarousel = true;
  }

  // for mach2 images
  if (
    originalSelections.optionalUpgrades.includes("MA01") ||
    reconSelections.optionalUpgrades.includes("MA01")
  ) {
    selectedImages =
      targetImages[`${onPersonalitySelected}/${selectedModel}/MA`];
    console.log(" CH renderSection =>", selectedImages);
  }

  // console.log("imageurl ", targetImages[`${onPersonalitySelected}/${selectedModel}`]);
  // console.log("imageurl rendersection ", renderSection);

  // slide modals
  const renderTab = (from) => {
    switch (sidebarTab) {
      case sidebarSteps.compareVariants:
        return <CompareVariants setSidebarTab={setSidebarTab} />;
      case sidebarSteps.potentialSavings:
        return (
          <PotentitalSavings
            finalModal={"finalModal"}
            setSidebarTab={setSidebarTab}
            country={"IN"}
          />
        );
      default:
        return null;
    }
  };

  const sidePanelRef = useRef(null);
  useOutsideClick(sidePanelRef, () => {
    setSidebarTab((e) => {
      if (
        [sidebarSteps.compareVariants, sidebarSteps.potentialSavings].includes(
          e
        )
      ) {
        return sidebarSteps.sidebarStep1;
      } else {
        return e;
      }
    });
  });

  const onIconHandler = async () => {
    setShowModal(true);
  };

  const getPrincipalPrice = (price: any) => {
    if (!price) {
      const defaultPrice =
        selectedModel === "Original"
          ? ConfiguratorConstants.mach2DefaultPrice
          : ConfiguratorConstants.mach2ReconDefaultPrice;
      return defaultPrice;
    }

    return price;
  };

  const getFormattedPrice = (price: any) =>
    formatPrice({
      price: price,
      defaultPrice: getPrincipalPrice(price),
    });

  return (
    <div className={`${style.image_container} bg-white sm:mt-16 relative`}>
      {/* logo for mobile */}
      <div className="relative top-[9%] z-20 -mt-[2%] sm:mt-0">
        {selectedModel === "Original" ? (
          <div className="justify-center items-center h-full sm:hidden flex">
            <Image
              src="/images/config/chosevarient/original1.png"
              alt="Image 3"
              loading="eager"
              width={170}
              height={170}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="justify-center items-center h-full sm:hidden flex">
            <Image
              src="/images/config/chosevarient/recon1.png"
              alt="Image 3"
              loading="eager"
              width={270}
              height={270}
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </div>

      <BasicImages
        altText={altText}
        images={selectedImages}
        className={`${style.image_render} ${className}`}
        isCarousel={isCarousel}
        setRenderSection={setRenderSection}
        isControlsVisible={isControlsVisible}
        setControlsVisible={setControlsVisible}
        isVideo={renderSection === "PP00"}
        selectedModel={selectedModel}
      />

      {/* Container for SideTabs component */}
      <div
        className="justify-between sm:items-center absolute bottom-16 w-full sm:flex hidden"
        onMouseEnter={() => {
          setControlsVisible(true);
        }}
        onMouseLeave={() => {
          setControlsVisible(false);
        }}
      >
        <div className="absolute flex w-full justify-center">
          <div
            className={`text-[#343434] underline text-[10px] disketMono cursor-pointer mr-[3%] inline-block whitespace-nowrap mt-6 ${
              isControlsVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s" }}
          >
            <div onClick={() => setSidebarTab(sidebarSteps.compareVariants)}>
              COMPARE VARIANTS
            </div>
          </div>

          <div className="w-[700px] flex justify-center bg-white rounded-md rounded-tl-md py-3 shadow-md">
            <div className="">
              <ConfigureSideTabs
                list={["mach 2", "mach 2 recon"]}
                selected={currentTab}
                onSelect={handleTabSelect}
              />
            </div>
            <div className="sm:px-6 px-4 -mt-12">
              {/* <div className="-mb-12">
                <Image
                  src="/images/config/verticleLine.png"
                  alt="Image 2"
                  width={1.3}
                  height={2}
                  className="pt-[53px]"
                />
              </div> */}

              <div className="flex items-center">
                {/* <div className="sm:px-6 sm:-mr-10 inline-block font-semibold sm:text-[24px] lg:text-[26px] text-[20px] text-[#ED1C24] mt-[15px]">
                  ₹ {getFormattedPrice(updatedPricing?.total_price)}
                  <span className="font-normal text-[14px] ml-3 text-[#000]">
                    EMI ₹{" "}
                    {calculateMonthlyEmi(
                      getPrincipalPrice(updatedPricing?.total_price),
                      60,
                      9.99,
                      20
                    )}
                    /MO
                  </span>
                </div> */}
                {/* <div
                  onClick={onIconHandler}
                  className="cursor-pointer ml-6 mt-6"
                >
                  <Image
                    src={"/images/config/info.png"}
                    width={isMobile ? 15 : 17}
                    height={isMobile ? 15 : 17}
                    alt="Infor Icon"
                  />
                </div> */}
              </div>
            </div>
          </div>
          <div
            className={`text-[#343434] underline text-[10px] disketMono cursor-pointer ml-[3%] inline-block whitespace-nowrap mt-6 ${
              isControlsVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s" }}
            onClick={() => setSidebarTab(sidebarSteps.potentialSavings)}
          >
            <p>POTENTIAL FUEL SAVINGS</p>
          </div>
        </div>
      </div>

      {/* background color when the popup model is opened */}
      {(sidebarTab === sidebarSteps.compareVariants ||
        sidebarTab === sidebarSteps.potentialSavings) &&
        !isMobile && (
          <div className="fixed top-0 right-0 left-0 bottom-0 bg-[#0000007a] z-100" />
        )}

      {/* render tab */}
      <div ref={sidePanelRef}>
        <SideTab>{renderTab(2)}</SideTab>
      </div>

      {/* <div className={`${style.sticky_pricing}`}> */}
      <div
        className={`fixed bottom-0 left-[22px] right-6 -mx-4 bg-[#F8F8F8] rounded-tl-md rounded-tr-md pt-4 pb-2 px-2 shadow-md sm:hidden z-10`}
      >
        <div className="flex justify-center w-full">
          <div className="">
            <ConfigureSideTabs
              list={["mach 2", "mach 2 recon"]}
              selected={currentTab}
              onSelect={handleTabSelect}
            />
          </div>
          {/* <div className="px-2 -mt-5 text-right">
            <div className="sm:px-6 inline-block font-semibold text-[1.3em] text-[#ED1C24] mt-[15px]">
              ₹ {getFormattedPrice(updatedPricing?.total_price)}
            </div>
            <div className="font-normal text-[13px] text-[#9C9C9C] -mt-1 mb-1">
              EMI ₹{" "}
              {calculateMonthlyEmi(
                getPrincipalPrice(updatedPricing?.total_price),
                60,
                9.99,
                20
              )}
              /MO
            </div>
          </div> */}
        </div>
      </div>

      {/* Modal if user is not loggedin */}
      {showModal && (
        <Modal
          state={showModal}
          stateHandler={(v) => {
            if (!v) {
              setShowModal(false);
            }
          }}
          closeOnClickOutside
        >
          <div className="bg-white rounded-sm sm:w-[785px] sm:h-[307px] w-[90vw] h-[317px]">
            <div className="flex justify-between">
              <div className="px-12 mt-16 brutal">
                This is an introductory price for the F77 Mach 2, as part of
                Ultraviolette’s{" "}
                <span className="font-medium">Carbon Farewell Fund</span>. The
                first 1000 F77 Mach 2 customers avail a reduction of INR 25,000
                on the ex-showroom price.{" "}
                <a
                  href="/legal/terms-conditions"
                  className="underline cursor-pointer"
                >
                  T&C
                </a>{" "}
                apply.
              </div>
              <div
                className=" right-7 top-7 cursor-pointer"
                onClick={(e) => {
                  setShowModal(false);
                }}
              >
                <Image
                  width={22}
                  height={22}
                  alt="tent"
                  src="/images/icons/cross-black.svg"
                  className="mt-[14px] sm:mt-8 sm:mr-14 mr-10"
                />
              </div>
            </div>

            {/* Email ID */}
            <div className="mt-7 px-12 nunito brutal sm:mr-14 mr-10">
              Monthly Installment (EMI) mentioned is approximately based on 9.9%
              interest rate for 60 months, with 20% down-payment. Prices are
              exclusive of taxes & may vary as per CIBIL score.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ConfigImageContainer;
