// @ts-nocheck
import Style from "../variant.module.scss";
import { TextElement } from "../../../components/atoms/Texts";
import VariantCard, {
  TooltipInfo,
} from "../../../components/atoms/Cards/VariantCard";
import Image from "next/image";
import SideTabs from "../../../components/atoms/SideTabs";
import TotalFooter from "./TotalFooter";
import { sidebarSteps } from "..";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { usePricingDetails } from "../../../queries/config";
import { useRouter } from "next/router";
import {
  UpdateUserBooking,
  UpdateUserReconfigure,
} from "../../../services/configuratorService";
import { setBookingConfig } from "../../../services/helper";
import { PAYMENT_MODES } from "../../.././constants";
import { ConfigFlow, ReferrerFlow } from "../../../utils/CookieManagement";
import { getcompleteUserProfile } from "../../../services/ProfileService";
import Modal from "../../../components/molecules/Modal";

const ConfigureSteps = ({ setSidebarTab, selectedItems, setSelectedItems, country }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const { isMobile, userData, IsInternational } = useContext(NavbarContext);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(0);

  const { data: pricingDetails } = usePricingDetails(country, () => { });
  const router = useRouter();

  const [preselectedItems, setPreselectedItems] = useState([]);
  const [showExchangeModal, setShowExchangeModal] = useState<boolean>(false);

  const updateItem = useCallback(
    (item) => {
      const target = selectedItems?.find(
        (e) =>
          e?.category === item.category &&
          e?.sub_category === e?.sub_category &&
          e?.name === item.name
      );
      if (target) {
        setSelectedItems((list) =>
          list.filter((e) =>
            e?.category === item.category && e?.sub_category === item.sub_category
              ? item.name !== e?.name
              : item.hide_on !== e?.id
          )
        );
      } else {
        setSelectedItems((list) => [...list, item]);
      }
    },
    [selectedItems]
  );

  const ReplaceItem = useCallback(
    (item) => {
      setSelectedItems((list) => {
        let temp = list
          ?.filter((each) => each?.hide_on !== item?.id)
          ?.filter((e) =>
            e?.category === item?.category && e?.sub_category === item.sub_category
              ? false
              : true
          );
        temp.push(item);
        console.log("temp item => " + temp)
        console.log(temp);

        if (item?.id === 1) {
          temp = temp.filter((e) => ![10, 11].includes(e.id));
          if (!temp.find((ea) => ea.id === 9)) {
            temp.push(pricingDetails?.items?.find?.((ea) => ea.id === 9));
          }
        }
        if (item?.id === 2) {
          temp = temp.filter((e) => ![9, 11].includes(e.id));
          if (!temp.find((ea) => ea.id === 10)) {
            temp.push(pricingDetails?.items?.find?.((ea) => ea.id === 10));
          }
        }
        return temp;
      });
    },
    [selectedItems]
  );

  useEffect(() => {
    (async () => {
      if (userData?.email) {
        const userProfile = await getcompleteUserProfile({
          email: userData.email,
        });
        if (userProfile?.items?.length) {
          setPreselectedItems(userProfile?.items);
        }
      }
    })();
  }, [userData]);

  const preselectionDone = useRef(false);

  useEffect(() => {
    if (
      preselectedItems.length &&
      pricingDetails?.items &&
      !preselectionDone.current
    ) {
      preselectedItems.forEach((e: any, i) => {
        const target = pricingDetails?.items?.find((each) => each?.id === e?.id);
        const isMultiSelect = pricingDetails?.sub_category_config?.find(
          (ea) => ea.sub_category_id === target?.sub_category
        )?.multi_select;

        setTimeout(() => {
          if (isMultiSelect) {
            updateItem(target);
          } else {
            ReplaceItem(target);
          }
        }, 200 * (i + 1));
      }, []);
      preselectionDone.current = true;
    }
  }, [preselectedItems, pricingDetails]);

  useEffect(() => {
    let items: any = [];
    pricingDetails?.items?.forEach((e) => {
      if (
        !items.find((each) => each?.category === "variant") &&
        e.category === "variant"
      ) {
        items.push(e);
      }
    });
    items = [
      ...items,
      ...(pricingDetails?.items?.filter((e) => e?.included) || []),
    ];
    items.filter(
      (ea) => !pricingDetails?.items?.some((e) => e?.hide_on === ea.id)
    );
    setSelectedItems(items);
  }, [pricingDetails?.items]);

  let selected = useRef([]);
  useEffect(() => {
    if (selected.current !== selectedItems) {
      // setSelectedItems(selectedItems.filter((e)=>!selectedItems?.some((ea)=>ea.hide_on===e.id)));
      // setTimeout(()=>{
      //   selected.current = selectedItems.filter((e)=>!selectedItems?.some((ea)=>ea.hide_on===e.id))
      // })
    }
  }, [selectedItems]);

  // @ts-ignore
  const categories = [
    ...new Set(
      (pricingDetails?.items || []).map((item) => item.category) as any
    ),
  ];

  // @ts-ignore
  const getSubcategories = (category): string[] => [
    ...new Set(
      pricingDetails?.items
        ?.filter((e) => e?.category === category)
        .map((item) => item.sub_category)
    ),
  ];

  const getSubCategory = (category) =>
    pricingDetails.sub_category_config.find(
      (e) => e?.sub_category_id === category
    );

  const RenderSection = ({
    title,
    category,
    sub_category,
    pricingDetails,
    isLast = true,
    topInfo = "",
    bottomInfo = "",
    multiSelect = false,
    deltaId = 0,
    country,
  }) => {
    const deltaPrice = pricingDetails?.items?.find((e) => e?.id === deltaId);
    const targetPrice = selectedPaymentMode ? "price" : "emi_mo";

    return (
      <div style={{ borderBottom: isLast ? "none" : "1px solid #d1d1d1" }}>
        <div className="mt-6 lg:mt-9">
          {
            TextElement({ text: title, fontSize: isMobile ? 16 : 20 }).MEDUIM
              .BLACK
          }
        </div>

        {
          TextElement({
            text: topInfo,
            fontSize: isMobile ? 12 : 14,
            className: "mt-2 mb-8",
          }).REGULAR.BLACK
        }
        <div className="space-y-5">
          {pricingDetails?.items
            ?.sort((a, b) => a.id - b.id)
            ?.filter(
              (each) =>
                each?.category === category && each?.sub_category === sub_category
            )
            ?.map((e, i) => (
              <>
                {e.hide_on &&
                  selectedItems.find((each) => each?.id === e?.hide_on) ? null : (
                  <VariantCard
                    disabled={
                      !e.allow_reconfigure &&
                      userData?.booking_paid &&
                      !userData.reconfigured
                    }
                    {...(e.tooltip_description
                      ? {
                        info: {
                          description: e?.tooltip_description,
                          header: e?.tooltip_header,
                          list: e?.tooltip_list,
                        },
                      }
                      : {})}
                    description={e.description}
                    key={i}
                    selected={selectedItems.find((each) => {
                      return (
                        each?.name === e?.name && each?.category === e?.category
                      );
                    })}
                    showEmi={!selectedPaymentMode}
                    price={Number(
                      deltaId
                        ? e?.[targetPrice] - deltaPrice?.[targetPrice]
                        : e?.[targetPrice]
                    )}
                    label={e.name}
                    showIncluded={e.included}
                    onClick={() => {
                      multiSelect ? updateItem(e) : ReplaceItem(e);
                    }}
                    country={country}
                  />
                )}
              </>
            ))}
        </div>
        {
          TextElement({
            text: bottomInfo,
            fontSize: isMobile ? 12 : 14,
            className: "mt-4 mb-8",
          }).MEDUIM.BLACK
        }
      </div>
    );
  };

  const ConfirmConfiguration = async () => {
    try {
      if (userData?.email) {
        console.log("QQQ", IsInternational());
        
        if (IsInternational()) {
          await UpdateUserBooking({
            model: router.query.variant as string,
            email: userData?.email,
            booking_configuration: selectedItems.map((each) => each?.id),
            pay_option: PAYMENT_MODES[selectedPaymentMode],
            country: country,
          });
          router.push(`/thankyou`);
        } else {
          if (userData?.booking_paid) {
            if (!userData.reconfigured) {
              await UpdateUserReconfigure({
                email: userData.email,
                booking_configuration: selectedItems.map((each) => each?.id),
                pay_option: PAYMENT_MODES[selectedPaymentMode],
                model: router.query.variant as string,
                variant: selectedItems?.find((e) => e?.id === 1)
                  ? "F77ORIGINAL"
                  : "F77RECON",
              });
              router.push(`/summary`);
            } else {
              router.push("/uhoh");
            }
          } else {
            // uh oh page
            await UpdateUserBooking({
              model: router.query.variant as string,
              email: userData?.email,
              booking_configuration: selectedItems.map((each) => each?.id),
              pay_option: PAYMENT_MODES[selectedPaymentMode],
              country: "IN"
            });
            router.push(`/summary`);
          }
        }
      } else {
        setBookingConfig({
          model: router.query.variant as string,
          booking_configuration: selectedItems,
          payment_mode: PAYMENT_MODES[selectedPaymentMode],
        });
        ConfigFlow.setCookie("next");
        ReferrerFlow.setCookie(router.asPath);
        router.push(`/signin`);
      }
    } catch (err) {
      setBookingConfig({
        model: router.query.variant as string,
        booking_configuration: selectedItems,
        payment_mode: PAYMENT_MODES[selectedPaymentMode],
      });
      ConfigFlow.setCookie("next");
      ReferrerFlow.setCookie(router.asPath);
      router.push(`/signin`);
    }
  };

  const oncloseModal = () => {
    setShowExchangeModal(false);
    // setShowFinanceModal(false);
  }

  return (
    <div className={Style.configStep}>
      <div className="px-4 lg:px-14 flex flex-col">
        <div className="flex justify-between mt-9 lg:mt-10">
          <div className="flex items-baseline">
            <Image
              src={"/images/icons/f77.svg"}
              alt="f77 icon"
              width={isMobile ? 64 : 100}
              height={24}
            />
            {
              TextElement({
                text: (
                  (router?.query?.variant as string) || ""
                ).toLocaleUpperCase(),
                fontRelative: "",
                fontName: "eurostile",
                className: "ml-1.5 lg:ml-0 ",
              }).REGULAR.BLACK
            }
          </div>
          <Image
            src={"/images/icons/config-qr.png"}
            alt="f77 icon"
            width={isMobile ? 90 : 140}
            height={24}
          />
        </div>

        <div className="pt-8">
          <SideTabs
            appendIndex
            selected={currentTab}
            onSelect={(i) => {
              setCurrentTab(i);
            }}
            list={["VARIANT", "ACCESSORIES", "UV CARE"]}
          />

          <div className={Style.configStepContent}>
            {/* Variants */}
            {currentTab === 0 && (
              <div  className="sm:mr-2">
                {getSubcategories("variant").map((e, i) => {
                  return (
                    <div key={i}>
                      <RenderSection
                        deltaId={1}
                        category={"variant"}
                        sub_category={e}
                        pricingDetails={pricingDetails}
                        topInfo={getSubCategory(e)?.sub_category_description}
                        title={getSubCategory(e)?.sub_category_name}
                        multiSelect={getSubCategory(e)?.multi_select}
                        country={country}
                      />
                      {country === "IN" && (
                        <div className="flex justify-end w-full -mt-4">
                          {
                            TextElement({
                              text: "Compare variants",
                              fontSize: 14,
                              className: "underline cursor-pointer",
                              onClick: () =>
                                setSidebarTab(sidebarSteps.compareVariants),
                            }).REGULAR.BLACK
                          }
                        </div>
                      )}
                    </div>
                  );
                })}
                {country === "IN" && (
                  <div className="flex justify-end w-full mt-4">
                    {
                      TextElement({
                        text: "Exchange",
                        fontSize: 14,
                        className: "underline cursor-pointer",
                        onClick: () => {
                          setShowExchangeModal(true);
                        },
                      }).REGULAR.BLACK
                    }
                  </div>
                )}
                {showExchangeModal && (
                  <Modal
                    state={showExchangeModal}
                    stateHandler={(v) => {
                      setShowExchangeModal(false);
                    }}
                    closeOnClickOutside
                  >
                    <div className="w-10/12 lg:w-6/12 lg:pr-20 bg-white px-10 pb-14 pt-14 relative brutal text-[12px] sm:text-[17px]">
                      Exchange programme is available for your existing motorcycle . For exchange information contact{" "}
                      <span style={{ fontWeight: 'bold' }}>080-694-53322</span>
                      <div className="absolute right-7 top-7 cursor-pointer" onClick={oncloseModal}>
                        <Image
                          width={12}
                          height={12}
                          alt="tent"
                          src="/images/icons/cross-black.svg"
                        />
                      </div>
                    </div>
                  </Modal>
                )}
              </div>
            )}

            {/* Accessories */}
            {currentTab === 1 && (
              <div className="sm:mr-2">
                {getSubcategories("accessory").map((e, i) => {
                  return (
                    <div key={i}>
                      <RenderSection
                        category={"accessory"}
                        multiSelect={getSubCategory(e)?.multi_select}
                        sub_category={e}
                        isLast={i === getSubcategories("accessory").length - 1}
                        pricingDetails={pricingDetails}
                        topInfo={getSubCategory(e)?.sub_category_description}
                        title={getSubCategory(e)?.sub_category_name}
                        country={country}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Services */}

            {currentTab === 2 && (
              <div className="sm:mr-2">
                {getSubcategories("uv_care").map((e, i) => {
                  return (
                    <div key={i}>
                      <RenderSection
                        deltaId={
                          selectedItems?.find((e) => e?.id === 1) ? 9 : 10
                        }
                        category={"uv_care"}
                        multiSelect={getSubCategory(e)?.multi_select}
                        sub_category={e}
                        isLast={i === getSubcategories("uv_care").length - 1}
                        pricingDetails={pricingDetails}
                        topInfo={getSubCategory(e)?.sub_category_description}
                        title={getSubCategory(e)?.sub_category_name}
                        country={country}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {!isMobile && <div className="lg:h-40" />}
          </div>
        </div>
      </div>

      <TotalFooter
        isLimited={false}
        pricingDetails={pricingDetails?.items}
        selectedPaymentMode={selectedPaymentMode}
        setSelectedPaymentMode={setSelectedPaymentMode}
        onNext={async () => {
          if (categories.length - 1 === currentTab) {
            ConfirmConfiguration();
          } else {
            setCurrentTab((e) => e + 1);
          }
        }}
        selectedItems={selectedItems}
        currentTab={currentTab}
        country={country}
      />
    </div>
  );
};

export default ConfigureSteps;