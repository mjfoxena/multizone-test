import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../../contexts/NavbarContext";
import style from "../../pages/configure/map.module.scss";
import { useChoseVarient, useUpdatedPricing } from "../../queries/config";
import { IUser } from "../../services/ProfileService";
import { saveConfigUserInfo } from "../../services/auth";
import { setBookingConfig } from "../../services/helper";
import { IConfigDetails } from "../../utils/interface/types";
import CountUpComp from "../molecules/Home/countUp";
import AdditionalUpgrades from "./configDetails/additionalUpgrade";
import ConfigSection from "./configDetails/configSection";
import ConfigSectionRecon from "./configDetails/configSectionRecon";
import OptionalUpgrades from "./configDetails/optionalUpgrades";
import Personality from "./configDetails/personality";
const MemoizedCountUpComp = React.memo(CountUpComp);

gsap.registerPlugin(ScrollTrigger);

const ConfigScrollContainer = ({
  selectedModel,
  onPersonalitySelected,
  setOriginalSelections,
  setReconSelections,
  originalSelections,
  reconSelections,
  setUpdatedPricing,
  setRenderSection,
  updateOptionCode,
}) => {
  const { userData, tempAuth } = useContext(NavbarContext);

  const [personality, setPersonality] = useState("");
  const router = useRouter();
  const [selectedDetails, setSelectedDetails] = useState<IConfigDetails | null>(
    null
  );
  const [choseVariantData, setChooseVariantData] = useState(null);
  const [selectedOptionsCodes, setSelectedOptionCodes] = useState<string | any>(
    []
  );

  const {
    data: variantData,
    error,
    isLoading,
  } = useChoseVarient(
    { country: "COBH", model: "MF77", request_type: 2, version: "V702" },
    () => {}
  );

  const selectedItemsWithModelCode = [
    selectedModel === "Original"
      ? originalSelections.option_code
      : reconSelections.option_code,
    selectedModel === "Original" ? "X000" : "X001",
    ...(selectedModel === "Original"
      ? originalSelections.optionalUpgrades
      : reconSelections.optionalUpgrades),
  ];
  const filteredList = selectedItemsWithModelCode.filter(
    (item) => item !== null && item !== ""
  );

  const {
    data: updatedPricingData,
    error: pricingError,
    isLoading: pricingIsLoading,
  } = useUpdatedPricing(filteredList, () => {});

  console.log("updatedPricingData ", originalSelections.optionalUpgrades);

  const { data: choseVariantDetails } = useChoseVarient(
    { country: "COBH", model: "MF77", request_type: 1 },
    () => {}
  );
  useEffect(() => {
    const filteredData = choseVariantDetails?.find(
      (variant) => variant.variant_name === selectedModel
    );
    setChooseVariantData(filteredData);
  }, [selectedModel, choseVariantDetails]);

  useEffect(() => {
    if (variantData) {
      const key = selectedModel === "Original" ? "X000" : "X001";
      setSelectedDetails(variantData[key]);

      console.log(selectedDetails, "selectedDetails", variantData[key]);

      let selectedIncluded: any = [];

      selectedDetails?.config_details.forEach((details) => {
        if (details.included) {
          selectedIncluded.push(details.default);
        }
      });
      // Set to Orifinal
      if (selectedModel === "Original") {
        setOriginalSelections({
          ...originalSelections,
          selected_option: selectedIncluded,
        });
      }

      console.log("selectedDetails selectedIncluded", selectedIncluded);
    }
  }, [variantData, selectedModel]);

  useEffect(() => {
    // Set to Orifinal
    if (selectedModel === "Original") {
      setOriginalSelections({
        ...originalSelections,
        selected_option: selectedOptionsCodes,
      });
    } else {
      setReconSelections({
        ...reconSelections,
        selected_option: selectedOptionsCodes,
      });
    }

    console.log(selectedOptionsCodes, "selectedOptionsCodes");
  }, [selectedOptionsCodes]);

  // updated Pricing Data section
  useEffect(() => {
    if (updatedPricingData) {
      setUpdatedPricing(updatedPricingData);
    }
  }, [updatedPricingData]);

  useEffect(() => {
    // console.log("Running now");

    let ctx = gsap.context(() => {
      gsap.set(".map_image_render__m9rU2:not(:first-child)", { opacity: 0 });

      const animation1 = gsap.to(".one", {
        opacity: 1,
        duration: 0.1,
        stagger: 1,
      });

      const animation2 = gsap.to(".two", {
        opacity: 1,
        duration: 0.8,
        stagger: 1,
      });

      const animation3 = gsap.to(".three", {
        opacity: 1,
        duration: 0.8,
        stagger: 1,
      });

      const animation4 = gsap.to(".four", {
        opacity: 1,
        duration: 0.8,
        stagger: 1,
      });

      const animation5 = gsap.to(".five", {
        opacity: 1,
        duration: 0.8,
        stagger: 1,
      });

      ScrollTrigger.create({
        trigger: "#section-one",
        start: "top center",
        end: "bottom center",
        animation: animation1,
        // markers: true,
        onEnter: () => setRenderSection("PP"),
        onLeaveBack: () => setRenderSection("IN"),
        onLeave: () => setRenderSection("DS"),
        onEnterBack: () => setRenderSection("PP"),
      });

      ScrollTrigger.create({
        trigger: "#section-two",
        start: "top center",
        end: "bottom center",
        animation: animation2,
        // markers: true,
        onEnter: () => setRenderSection("DS"),
        onLeaveBack: () => setRenderSection("PP"),
        onLeave: () => setRenderSection("CH"),
        onEnterBack: () => setRenderSection("DS"),
      });

      ScrollTrigger.create({
        trigger: "#section-three",
        start: "top center",
        end: "bottom center",
        animation: animation3,
        // markers: true,
        onEnter: () => setRenderSection("CH"),
        onLeaveBack: () => setRenderSection("DS"),
        onLeave: () => setRenderSection("SE"),
        onEnterBack: () => setRenderSection("CH"),
      });

      ScrollTrigger.create({
        trigger: "#section-four",
        start: "top center",
        end: "bottom center",
        animation: animation4,
        // markers: true,
        onEnter: () => setRenderSection("SE"),
        onLeaveBack: () => setRenderSection("CH"),
        onLeave: () => setRenderSection("UP"),
        onEnterBack: () => setRenderSection("SE"),
      });

      ScrollTrigger.create({
        trigger: "#section-five",
        start: "top center",
        end: "bottom bottom",
        animation: animation4,
        // markers: true,
        onEnter: () => setRenderSection("UP"),
        onLeaveBack: () => setRenderSection("SE"),
        onEnterBack: () => setRenderSection("UP"),
      });
    });
    return () => ctx.revert();
  }, [selectedDetails]);

  const handleConfiguration = async () => {
    let data;

    if (
      selectedModel === "Original" &&
      typeof originalSelections === "object"
    ) {
      data = Object.values(originalSelections).flat();
    } else if (
      selectedModel === "Recon" &&
      typeof originalSelections === "object"
    ) {
      data = Object.values(reconSelections).flat();
    } else {
      data = [];
    }

    const configurePayload = [
      selectedModel === "Recon" ? "X001" : "X000",
      ...data,
    ];

    console.log("configurePayload ", configurePayload);

    let filteredSelections: any[] = [];

    configurePayload.forEach((item: any) => {
      if (!filteredSelections.includes(item)) {
        filteredSelections.push(item);
      }
    });
    const config_body: Partial<IUser> = {
      email: userData?.email,
      options: filteredSelections,
    };

    setBookingConfig(filteredSelections);

    if (userData?.email && !userData?.booking_paid) {
      if (filteredSelections.length > 0) {
        await saveConfigUserInfo(config_body, tempAuth);
        router.push("/summary");
      }
    } else {
      router.push("/signin");
    }
  };

  return (
    <div
      className={`${style.section_container} sm:w-[27vw] 2xl:w-[27vw] w-full mt-10 sm:mt-0 -z-10`}
    >
      <section className="bg-white">
        <div className={`${style.box} sm:mx-6 mx-6 sm:mb-10 mb-12 sm:mt-6`}>
          {selectedModel === "Original" ? (
            <>
              <div className="justify-center items-center h-full hidden sm:flex">
                <Image
                  src="/images/config/original_logo1.png"
                  alt="Image 3"
                  loading="eager"
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="mt-6 sm:mt-8 brutal flex justify-between"
                style={{ letterSpacing: "0.2px" }}
              >
                <div>
                  <div className="eurostile font-bold text-[#ED1C24] sm:text-[2em] text-[1.6em] mt-2">
                    <CountUpComp
                      countStart={318}
                      // @ts-ignore
                      countEnd={choseVariantData?.variant_properties?.range}
                      decimal={0}
                    />
                  </div>
                  <h2 className=" text-[#585858] sm:text-[13px] text-[10px] brutal">
                    <span className="ml-[15%]">RANGE</span>
                    <p>(IDC Est. KM)</p>
                  </h2>
                </div>
                <div>
                  <div className="eurostile font-bold text-[#ED1C24] sm:text-[2em] text-[1.6em] mt-2 ml-4">
                    <CountUpComp
                      countStart={155}
                      // @ts-ignore
                      countEnd={choseVariantData?.variant_properties?.top_speed}
                      decimal={0}
                    />
                  </div>
                  <h2 className="text-[#585858] sm:text-[13px] text-[10px] brutal ml-5">
                    TOP SPEED
                    <p className="ml-[18%]">(kmph)</p>
                  </h2>
                </div>
                <div>
                  <div className="eurostile font-bold text-[#ED1C24] sm:text-[2em] text-[1.6em] mt-2">
                    <CountUpComp
                      countStart={100}
                      // @ts-ignore
                      countEnd={choseVariantData?.variant_properties?.torque}
                      decimal={0}
                    />
                  </div>
                  <h2 className="text-[#585858] sm:text-[13px] text-[10px] brutal ml-1">
                    TORQUE
                    <p className="ml-[18%]">(nm)</p>
                  </h2>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="justify-center items-center h-full hidden sm:flex">
                <Image
                  src="/images/config/recon_logo1.png"
                  alt="Image 3"
                  loading="eager"
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="mt-6 sm:mt-8 brutal flex justify-between"
                style={{ letterSpacing: "0.2px" }}
              >
                <div>
                  <div className="eurostile font-bold text-[#ED1C24] sm:text-[2em] text-[1.6em] mt-2">
                    <CountUpComp
                      countStart={211}
                      // @ts-ignore
                      countEnd={choseVariantData?.variant_properties?.range}
                      decimal={0}
                    />
                  </div>
                  <h2 className=" text-[#585858] sm:text-[13px] text-[10px] brutal">
                    <span className="ml-[15%]">RANGE</span>
                    <p>(IDC Est. KM)</p>
                  </h2>
                </div>
                <div>
                  <div className="eurostile font-bold text-[#ED1C24] sm:text-[2em] text-[1.6em] mt-2 ml-4">
                    <MemoizedCountUpComp
                      countStart={155}
                      // @ts-ignore
                      countEnd={choseVariantData?.variant_properties?.top_speed}
                      decimal={0}
                    />
                  </div>
                  <h2 className="text-[#585858] sm:text-[13px] text-[10px] brutal ml-6">
                    TOP SPEED
                    <p className="ml-[18%]">(kmph)</p>
                  </h2>
                </div>
                <div>
                  <div className="eurostile font-bold text-[#ED1C24] sm:text-[2em] text-[1.6em] mt-2">
                    <CountUpComp
                      countStart={90}
                      // @ts-ignore
                      countEnd={choseVariantData?.variant_properties?.torque}
                      decimal={0}
                    />
                  </div>
                  <h2 className="text-[#585858] sm:text-[13px] text-[10px] brutal ml-4">
                    TORQUE
                    <p className="ml-[18%]">(nm)</p>
                  </h2>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* personality and { TECH & PERFORMANCE } Section */}
      <section className="bg-white">
        <div className={`${style.box} sm:mt-12 sm:mx-6 mx-6`}>
          {selectedDetails !== null &&
            selectedDetails.config_details[0].visibility ===
              "colour_special" && (
              <Personality
                onPersonalitySelected={(id: string) => {
                  setPersonality(id);
                  onPersonalitySelected(id);
                }}
                selectedModel={selectedModel}
                selectedDetails={selectedDetails?.config_details[0]}
                setOriginalSelections={setOriginalSelections}
                setReconSelections={setReconSelections}
                updateOptionCode={updateOptionCode}
              />
            )}
        </div>
      </section>

      {selectedModel === "Original" && (
        <>
          <section className="bg-white">
            <div
              className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}
              id="section-one"
            >
              {selectedDetails !== null &&
                selectedDetails.config_details[1].visibility === "yes" && (
                  <ConfigSection
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[1]}
                    setOriginalSelections={setOriginalSelections}
                    originalSelections={originalSelections}
                    setSelectedOptionCodes={setSelectedOptionCodes}
                  />
                )}
            </div>
          </section>

          <section className="scroll-trigger-sec bg-white">
            <div
              className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}
              id="section-two"
            >
              {selectedDetails !== null &&
                selectedDetails.config_details[2].visibility === "yes" && (
                  <ConfigSection
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[2]}
                    setOriginalSelections={setOriginalSelections}
                    originalSelections={originalSelections}
                    setSelectedOptionCodes={setSelectedOptionCodes}
                  />
                )}
            </div>
          </section>

          <section className="scroll-trigger-sec bg-white">
            <div
              className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}
              id="section-three"
            >
              {selectedDetails !== null &&
                selectedDetails.config_details[3].visibility === "yes" && (
                  <ConfigSection
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[3]}
                    setOriginalSelections={setOriginalSelections}
                    originalSelections={originalSelections}
                    setSelectedOptionCodes={setSelectedOptionCodes}
                  />
                )}
            </div>
          </section>

          <section className="scroll-trigger-sec bg-white">
            <div
              className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}
              id="section-four"
            >
              {selectedDetails !== null &&
                selectedDetails.config_details[4].visibility === "yes" && (
                  <ConfigSection
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[4]}
                    setOriginalSelections={setOriginalSelections}
                    originalSelections={originalSelections}
                    setSelectedOptionCodes={setSelectedOptionCodes}
                  />
                )}
            </div>
          </section>

          <section className="scroll-trigger-sec bg-white">
            <div className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}>
              {selectedDetails !== null &&
                selectedDetails.config_details[5].visibility === "yes" && (
                  <ConfigSection
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[5]}
                    setOriginalSelections={setOriginalSelections}
                    originalSelections={originalSelections}
                    setSelectedOptionCodes={setSelectedOptionCodes}
                  />
                )}
            </div>
          </section>

          <section className="scroll-trigger-sec bg-white">
            <div className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}>
              {selectedDetails !== null &&
                selectedDetails.config_details[6].visibility === "yes" && (
                  <ConfigSection
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[6]}
                    setOriginalSelections={setOriginalSelections}
                    originalSelections={originalSelections}
                    setSelectedOptionCodes={setSelectedOptionCodes}
                  />
                )}
            </div>
          </section>
        </>
      )}

      {selectedModel === "Recon" && (
        <>
          <section className="bg-white">
            <div
              className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}
              id="section-one"
            >
              {selectedDetails !== null &&
                selectedDetails.config_details[1].visibility === "yes" && (
                  <ConfigSectionRecon
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[1]}
                    setReconSelections={setReconSelections}
                  />
                )}
            </div>
          </section>

          <section className="scroll-trigger-sec bg-white">
            <div
              className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}
              id="section-two"
            >
              {selectedDetails !== null &&
                selectedDetails.config_details[2].visibility === "yes" && (
                  <ConfigSectionRecon
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[2]}
                    setReconSelections={setReconSelections}
                  />
                )}
            </div>
          </section>

          <section className="scroll-trigger-sec bg-white">
            <div
              className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}
              id="section-three"
            >
              {selectedDetails !== null &&
                selectedDetails.config_details[3].visibility === "yes" && (
                  <ConfigSectionRecon
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[3]}
                    setReconSelections={setReconSelections}
                  />
                )}
            </div>
          </section>

          <section className="scroll-trigger-sec bg-white">
            <div
              className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}
              id="section-four"
            >
              {selectedDetails !== null &&
                selectedDetails.config_details[4].visibility === "yes" && (
                  <ConfigSectionRecon
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[4]}
                    setReconSelections={setReconSelections}
                  />
                )}
            </div>
          </section>

          <section className="scroll-trigger-sec bg-white">
            <div className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}>
              {selectedDetails !== null &&
                selectedDetails.config_details[5].visibility === "yes" && (
                  <ConfigSectionRecon
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[5]}
                    setReconSelections={setReconSelections}
                  />
                )}
            </div>
          </section>

          <section className="scroll-trigger-sec bg-white">
            <div className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}>
              {selectedDetails !== null &&
                selectedDetails.config_details[6].visibility === "yes" && (
                  <ConfigSectionRecon
                    selectedModel={selectedModel}
                    selectedDetails={selectedDetails?.config_details[6]}
                    setReconSelections={setReconSelections}
                  />
                )}
            </div>
          </section>

          {/* < section className="scroll-trigger-sec bg-white" >
                        <div className={`${style.box} sm:my-24 sm:mx-6 my-14 mx-6`}>
                            {selectedDetails !== null && selectedDetails.config_details[7].visibility === "yes" && (
                                <ConfigSection
                                    selectedModel={selectedModel}
                                    selectedDetails={selectedDetails?.config_details[7]}
                                />
                            )}
                        </div>
                    </section > */}
        </>
      )}

      {/* Optional Upgrades for Original*/}
      {selectedModel === "Original" && (
        <section className="scroll-trigger-sec bg-white">
          <div
            className={`${style.box} sm:mx-6 mb-0 sm:mb-10 mx-6`}
            id="section-five"
          >
            {selectedDetails !== null &&
              selectedDetails.config_details[7].visibility === "hidden" && (
                <OptionalUpgrades
                  multiSelect={true}
                  selectedModel={selectedModel}
                  setOriginalSelections={setOriginalSelections}
                  originalSelections={originalSelections}
                  selectedDetails={selectedDetails?.config_details[7]}
                />
              )}
          </div>
        </section>
      )}

      {/* additional Upgrades for Recon */}
      {selectedModel === "Recon" && (
        <section className="scroll-trigger-sec bg-white">
          <div
            className={`${style.box} sm:my-28 sm:mx-6 my-14 mx-6`}
            id="section-five"
          >
            {selectedDetails !== null &&
              selectedDetails.config_details[7].visibility === "yes" && (
                <AdditionalUpgrades
                  multiSelect={true}
                  selectedModel={selectedModel}
                  setReconSelections={setReconSelections}
                  reconSelections={reconSelections}
                  selectedDetails={selectedDetails?.config_details[7]}
                />
              )}
          </div>
        </section>
      )}

      {/* next button */}
      <div className="sm:mx-6 mx-6 sm:-my-4 my-10">
        <div
          className="w-full bg-[#000] text-[#FFF] rounded-md flex items-center justify-between cursor-pointer"
          onClick={handleConfiguration}
        >
          <button className="px-6 py-4 brutal">CONFIRM CONFIGURATION</button>
          <div className="relative">
            <Image
              src="/images/icons/arrow-white.svg"
              alt="Image 3"
              width={22}
              height={22}
              style={{ objectFit: "cover" }}
              className="mr-6"
            />
          </div>
        </div>
      </div>

      <div className="sm:mx-6 mx-6 my-0">
        <div className="w-full text-[#FFF] rounded-md flex items-center justify-between">
          <div className="px-6 py-4 brutal" onClick={() => {}}>
            ..
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigScrollContainer;
