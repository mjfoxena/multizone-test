import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import TotalFooter from "../../../containers/variants/sections/TotalFooter";
import { NavbarContext } from "../../../contexts/NavbarContext";
import { useLimitedPricingDetails } from "../../../queries/config";
import { UpdateUserBooking } from "../../../services/configuratorService";
import { setBookingConfig } from "../../../services/helper";
import { ConfigFlow, ReferrerFlow } from "../../../utils/CookieManagement";
import VariantCard from "../../atoms/Cards/VariantCard";
import { TextElement } from "../../atoms/Texts";
import Style from "./index.module.scss";

const LIMITED_SPACE = "space edition";

const LimitedConfigureStep = ({
  sidebarTab,
  setSidebarTab,
  selectedItems,
  setSelectedItems,
  finalModal,
  country,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(0);

  const { data: pricingDetails, error } = useLimitedPricingDetails(() => {});

  const router = useRouter();
  const { isMobile, userData, IsInternational } = useContext(NavbarContext);

  const updateItem = (item) => {
    if (item.included) {
      return;
    }
    const target = selectedItems?.find(
      (e) => e.category === item.category && e.name === item.name
    );
    if (target) {
      setSelectedItems((list) =>
        list.filter((e) =>
          e.category === item.category ? item.name !== e.name : true
        )
      );
    } else {
      setSelectedItems((list) => [...list, item]);
    }
  };

  const ReplaceItem = (item) => {
    if (item.included) {
      return;
    }
    const temp = selectedItems?.filter((e) =>
      e.category === item.category && e.sub_category === item.sub_category
        ? false
        : true
    );
    temp.push(item);
    setSelectedItems(temp);
  };

  useEffect(() => {
    setSelectedItems(pricingDetails?.items?.filter((e) => e.included) || []);
  }, [pricingDetails?.items]);

  // @ts-ignore
  const categories = [
    // @ts-ignore
    ...new Set(
      (pricingDetails?.items || []).map((item) => item.category) as any
    ),
  ];

  // @ts-ignore
  const getSubcategories = (category): string[] => [
    // @ts-ignore
    ...new Set(
      pricingDetails?.items
        .filter((e) => e.category === category)
        .map((item) => item.sub_category)
    ),
  ];

  const getSubCategory = (category) =>
    pricingDetails.items.find((e) => e.category_config === category);

  const RenderSection = ({
    title,
    category,
    sub_category,
    pricingDetails,
    isLast = true,
    topInfo = "",
    bottomInfo = "",
    multiSelect = false,
    parentLabel,
    country,
  }) => {
    return (
      <div style={{ borderBottom: isLast ? "none" : "1px solid #d1d1d1" }}>
        {pricingDetails?.items?.filter(
          (each) =>
            each.category === category && each.sub_category === sub_category
        )?.length > 0 && (
          <div className="mt-2">
            {
              TextElement({
                text: title,
                fontName: "disketMono",
                fontSize: isMobile ? 10 : 16,
              }).REGULAR.OVERLAYHEADING
            }
          </div>
        )}
        {
          TextElement({
            text: topInfo,
            fontSize: isMobile ? 12 : 14,
            className: "mt-4 mb-8",
          }).REGULAR.SUBTEXTGREY
        }
        <div className="space-y-5">
          {pricingDetails?.items
            ?.filter(
              (each) =>
                each.category === category && each.sub_category === sub_category
            )
            ?.map((e, i) => (
              <VariantCard
                {...(e.tooltip_description
                  ? {
                      info: {
                        description: e.tooltip_description,
                        header: e.tooltip_header,
                        list: e.tooltip_list,
                      },
                    }
                  : {})}
                isLimited={sidebarTab === "limited"}
                description={e.description}
                key={i}
                selected={
                  sidebarTab === "limited"
                    ? selectedItems
                        ?.filter((include) => !include.included)
                        .find((each) => {
                          return (
                            each.name === e.name && each.category === e.category
                          );
                        })
                    : selectedItems?.find((each) => {
                        return (
                          each.name === e.name && each.category === e.category
                        );
                      })
                }
                price={e.price}
                label={e.name}
                onClick={() => {
                  multiSelect ? updateItem(e) : ReplaceItem(e);
                }}
                showIncluded={e.included}
                parentLabel={parentLabel}
                country={country}
              />
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
        if (IsInternational()) {
          router.push("/thankyou");
        } else {
          console.log(userData, "user data");
          // if(userData)
          if (userData?.booking_paid) {
            router.push("/uhoh");
            // uh oh page
          } else {
            try {
              await UpdateUserBooking({
                model: finalModal as string,
                email: userData?.email,
                booking_configuration: selectedItems?.map((each) => each.id),
                pay_option: "full",
                limited_type: "space",
                country: country,
              });
              router.push(`/summary`);
            } catch (err) {}
          }
        }
      } else {
        setBookingConfig({
          model: finalModal,
          booking_configuration: selectedItems,
          payment_mode: "full",
        });
        ConfigFlow.setCookie("next");
        ReferrerFlow.setCookie(router.asPath);
        router.push(`/signin`);
      }
    } catch (err) {
      setBookingConfig({
        model: finalModal,
        booking_configuration: selectedItems,
        payment_mode: "full",
      });
      ConfigFlow.setCookie("next");
      ReferrerFlow.setCookie(router.asPath);
      router.push(`/signin`);
    }
  };

  return (
    <div className={Style.configStep}>
      <div className="px-10 lg:px-14x">
        <div
          className="flex justify-between pt-4 sm:mt-9 pb-[20px] lg:mt-20 sm:pb-[32px]"
          style={{ borderBottom: "1.48px solid #F26322" }}
        >
          <div className="flex items-center">
            <div className="sm:mr-[8px]">
              <Image
                src={"/images/icons/f77White.svg"}
                alt="f77 icon"
                width={isMobile ? 64 : 100}
                height={24}
              />
            </div>
            {
              TextElement({
                text: (LIMITED_SPACE || "").toLocaleUpperCase(),
                fontSize: isMobile ? 14 : 24,
                fontName: "eurostile",
                className: "ml-1.5 lg:ml-0",
              }).REGULAR.WHITE
            }
          </div>

          <Image
            src={"/images/icons/config-qr.png"}
            alt="f77 icon"
            width={isMobile ? 90 : 140}
            height={24}
          />
        </div>

        <div className="pt-5">
          <div className={Style.configStepContent}>
            {
              <div className="overflow-y-scroll">
                {getSubcategories("add_ons").map((e, i) => {
                  return (
                    <div key={i}>
                      <RenderSection
                        parentLabel={true}
                        category={"add_ons"}
                        multiSelect
                        sub_category={e}
                        isLast={i === getSubcategories("add_ons").length - 1}
                        pricingDetails={pricingDetails}
                        topInfo={getSubCategory(e)?.sub_category_description}
                        title={"ADD ON"}
                        country={country}
                      />
                    </div>
                  );
                })}
              </div>
            }
            {
              <div className="overflow-y-scroll">
                {getSubcategories("f77_limited_maxed_out").map((e, i) => {
                  return (
                    <div key={i}>
                      <RenderSection
                        parentLabel={false}
                        category={"f77_limited_maxed_out"}
                        sub_category={e}
                        isLast={
                          i ===
                          getSubcategories("f77_limited_maxed_out").length - 1
                        }
                        pricingDetails={pricingDetails}
                        topInfo={getSubCategory(e)?.sub_category_description}
                        title={"F77 SPACE EDITION - MAXED OUT"}
                        country={country}
                      />
                    </div>
                  );
                })}
              </div>
            }

            <div className={Style.noteText}>
              PLEASE NOTE: ACCESSORIES INCLUDED IN THE SPACE EDITION PRICE ARE
              SUBJECTED TO AVAILABILITY, MAYBE DELIVERED AT A LATER DATE.
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="lg:h-36 sm:h-16 h-10" />
        <TotalFooter
          isLimited={sidebarTab === "limited"}
          selectedPaymentMode={selectedPaymentMode}
          setSelectedPaymentMode={setSelectedPaymentMode}
          onNext={async () => {
            ConfirmConfiguration();
          }}
          selectedItems={selectedItems}
          currentTab={currentTab}
          country={country}
        />
      </div>
    </div>
  );
};

export default LimitedConfigureStep;
