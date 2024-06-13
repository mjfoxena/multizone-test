import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import { useContext, useEffect, useState } from "react";
import SideTabs from "../../components/atoms/SideTabs/index";
import FinanceTab from "../../components/payment/finance";
import InsuranceTab from "../../components/payment/insurance";
import KYCForm from "../../components/payment/kyc";
import PaymentGatewayTab from "../../components/payment/payment_gateway";
import { NavbarContext } from "../../contexts/NavbarContext";
import wheenLoading from "../../public/loader/Wheel_loading_(White).json";
import { ConfigCombination } from "../../queries/config";
import { getCognitoInfo } from "../../services/helper";
import {
  getPaymentConfigurationInfo,
  getPaymentSelectionDetails,
  getpaymentsummary,
} from "../../services/PaymentService";

import { GetServerSidePropsContext } from "next";
import GraphTags from "../../components/GraphTags";
import LottiePlayer from "../../components/molecules/lottiePlayer/lottie_player";
import { iConstants, iCustomPaymentIds } from "../../constants/raw_data";
import { EnvirionmentContext } from "../../contexts/EnvironmentContext";
import { PaymentContext } from "../../contexts/PaymentContext";

const tabs = [
  {
    text: "Insurance",
    id: "insurance",
  },
  {
    text: "Finance",
    id: "finance",
  },
  {
    text: "Payment",
    id: "payment",
  },
];

const PaymentConfiguration = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Data Set for Insurance
  const [insuranceDataSet, setInsuranceDataSet] = useState({
    items: [],
    details: [],
    title: "",
    description: "",
    subheader: "",
    meta: {},
  });

  // Data Set for Finance Data Set
  const [financeDataSet, setFinanceDataSet] = useState({
    items: [],
    details: [],
    tenure: [],
    content: { title: "", description: "", subheader: "" },
    total_amount: 0, // total amount to pay [variant price + insurance price]
  });

  // Variant Image
  const [variantImage, setVariantImage] = useState({
    variant: {},
    isLoading: false,
    error: false,
  });

  const { isUserInfoLoading, userData } = useContext(NavbarContext);
  const { environment, isSandbox, paymentMode } =
    useContext(EnvirionmentContext);
  const { paymentHistories } = useContext(PaymentContext);

  // Get Payment Info
  const [paymentInfoDataSet, setGetPaymentInfoDataSet] = useState<any>();
  const [loader, setLoader] = useState(false);

  // Insurance Bank Partners
  const [
    selectedInsuranceBankPartnerItem,
    setSelectedInsuranceBankPartnerItem,
  ] = useState({
    partner: {},
    selectedPlan: {},
    completed: false,
  });

  // Finance Bank Partners
  const [selectedFinanceBankPartnerItem, setSelectedFinanceBankPartnerItem] =
    useState({
      partner: {},
      completed: false,
      emi_plans: [],
      loan_info: {},
      tenure: {},
      variant_id: "", // [check it out || i dont need one]
    });

  // configuration Info
  const [configurationInfo, setConfiguration] = useState({
    loanInfo: {},
    userDetail: {},
    financePartner: {},
    insurancePartner: {},
    kyc_info: {},
    variant: {},
    payment_history: [],
    total_amount: 0,
  });

  /// RUn on load
  useEffect(() => {
    console.log("Calling 1st useEffect Hook: ", userData?.email);
    // console.log(getCognitoInfo());

    setLoader(true);
    if (!getCognitoInfo()) {
      router.push("/");
      return;
    }
    if (userData?.email !== undefined) {
      console.log("User Data Email: ", userData.email);
      getImageConfiguration();
      getInitialPaymentInfo();
    }
  }, [userData?.email]);

  // Payment Info
  useEffect(() => {
    onTabChange();
  }, [paymentInfoDataSet]);

  // Call on Changing Tabs
  useEffect(() => {
    setIsLoading(true);
    onTabChange();
    setIsLoading(false);
  }, [currentTab]);

  const handleUserSelectionDetail = (data, paymentInfoResult) => {
    // 1. Get Insurance Data from PaymentInfo
    // 2. Get Finance Data from PaymentInfo
    // const data = getPaymentSummary;

    const { finance, insurance } = paymentInfoResult; //paymentInfoDataSet
    // 3. Filter It based on User Selection result
    if (data.insurance_partner_id.length !== 0) {
      const selectedPartner = insurance.partners.filter(
        (partner) => partner.id === data.insurance_partner_id
      );

      // Handle for Bring My Own
      if (
        data.insurance_partner_id === iConstants.I_BRING_IT_OWN &&
        data.insurance_plan_id === 0
      ) {
        setSelectedInsuranceBankPartnerItem({
          ...selectedInsuranceBankPartnerItem,
          completed: true,
          partner: selectedPartner[0],
        });
      } else if (data.insurance_plan_id !== 0) {
        // For Other Partner

        const selectedPlan = insurance.details.filter(
          (plan) => plan.id === data.insurance_plan_id
        );
        if (selectedPartner.length !== 0 && selectedPlan.length !== 0) {
          setSelectedInsuranceBankPartnerItem({
            ...selectedInsuranceBankPartnerItem,
            completed: true,
            partner: selectedPartner[0],
            selectedPlan: selectedPlan[0],
          });
          // Move to Finance Tab
          setCurrentTab(1);
        }
      }
    }

    /// finance
    if (data.finance_partner_id.length !== 0) {
      const selectedPartner = finance.partners.filter(
        (partner) => partner.id === data.finance_partner_id
      );

      const myOwnFinance = iCustomPaymentIds.find(
        (id) => id === data.finance_partner_id
      );
      // handle Variant
      if (
        (data.finance_partner_id === iConstants.I_DONT_NEED_ONE ||
          myOwnFinance) &&
        data.finance_plan_id === 0
      ) {
        setSelectedFinanceBankPartnerItem({
          ...selectedFinanceBankPartnerItem,
          completed: true,
          partner: selectedPartner.length === 0 ? {} : selectedPartner[0],
          variant_id: myOwnFinance ? myOwnFinance : data.finance_partner_id,
          loan_info: {
            tenure: {},
            loan_amount: 0,
            total_loan_amount: 0,
          },
        });

        // Move to Payment Tab
        setCurrentTab(2);
      } else if (data.finance_plan_id !== 0) {
        const selectedPlan = finance.details.filter(
          (plan) => plan.id === data.finance_plan_id
        );
        const selectedTenure = finance.tenure.filter(
          (t) => t.id === data.finance_partner_id
        );
        if (selectedPartner.length !== 0 && selectedPlan.length !== 0) {
          setSelectedFinanceBankPartnerItem({
            ...selectedFinanceBankPartnerItem,
            completed: true,
            partner: selectedPartner[0],
            tenure: selectedTenure[0],
            variant_id: iConstants.CHECK_IT_OUT,
            loan_info: {
              tenure: selectedPlan[0],
              loan_amount: 0,
              total_loan_amount: 0,
            },
          });

          // Move to Payment Tab
          setCurrentTab(2);
        }
      }
    }
  };

  // Get Payment Summary
  const getPaymentSummaryInfo = async () => {
    if (userData?.email) {
      const body = { email: userData?.email };
      const paymentInfo = await getpaymentsummary(body);
      // console.log("paymentInfo: ", paymentInfo);

      if (paymentInfo.error) {
        return;
      }
      if (paymentInfo.payload) {
        setConfiguration({
          ...configurationInfo,
          loanInfo: paymentInfo.payload,
        });
      }
    }
  };

  /// Get Paymnet Info Data
  const getInitialPaymentInfo = async () => {
    setLoader(true);
    const paymentResult = await getPaymentConfigurationInfo(userData?.email);

    if (paymentResult.error) {
      return;
    }
    // Set Initially
    const info = paymentResult.payload;
    setGetPaymentInfoDataSet(info);

    // Get User Selections
    const { error, payload } = await getPaymentSelectionDetails(
      userData?.email
    );

    if (payload) {
      const selectionData = payload;
      // const selectionData = getPaymentSummary;
      handleUserSelectionDetail(selectionData, info);
    }

    // Total AMount
    // @ts-ignore
    const total_amount = info.total_amount;

    const paymentConfiguration = {
      ...configurationInfo,
      total_amount,
      kyc_info: {
        phone: userData?.phone,
        email: userData?.email,
      },
    };

    if (paymentConfiguration) {
      setConfiguration(paymentConfiguration);
    }
    setLoader(false);
  };

  // Get Image Configuration
  const getImageConfiguration = async () => {
    setVariantImage({
      ...variantImage,
      // @ts-ignore
      isLoading: true,
    });
    if (userData?.model) {
      // @ts-ignore
      const response = await ConfigCombination(userData?.model);
      const { base_url, image_config } = response.data;

      let modelPath =
        userData?.model[0].toUpperCase() + userData?.model.slice(1); // Convert first char to Uppercase
      let imageURL = "";

      // Handle Image and Path for limited
      if (userData?.model === iConstants.LIMITED_EDITION) {
        imageURL = base_url + image_config[modelPath][0];
      } else {
        modelPath = modelPath + "/Original";
        imageURL = base_url + image_config[modelPath][0]; // Get first image path from array
      }
      setVariantImage({
        ...variantImage,
        isLoading: false,
        variant: {
          image: imageURL,
          name: userData?.model,
        },
      });
    } else {
    }
  };

  // call on Tab Change
  const onTabChange = async () => {
    if (!paymentInfoDataSet) return;
    if (currentTab == 0) {
      const { insurance } = paymentInfoDataSet;

      const filterMetaOb = paymentInfoDataSet.insurance.meta.filter(
        (m) => m.id === userData?.variant
      );

      // To Get bring own item to the last position
      const reverseItems = [...insurance.partners].reverse();
      // @ts-ignore
      setInsuranceDataSet({
        // @ts-ignore
        items: reverseItems,
        details: insurance.details,
        description: insurance.content.description,
        subheader: insurance.content.subheader,
        title: insurance.content.title,
        meta: filterMetaOb[0],
      });
    } else if (currentTab == 1) {
      // Get Update Value

      const { finance, total_amount } = paymentInfoDataSet;

      // get Total Amount [Variant+insurance] from API
      // const getTotalAmount = ;

      // @ts-ignore
      setFinanceDataSet({
        items: finance.partners,
        content: finance.content,
        details: finance.details,
        tenure: finance.tenure,
        total_amount,
      });
    } else if (currentTab == 2) {
      // get payment summary
      getPaymentSummaryInfo();
    }
  };

  const showTabs = (tab) => {
    switch (tab) {
      case 0:
        return (
          <InsuranceTab
            onSaveInsuranceSelection={(plan) => {
              console.log("Selected Plan: ", plan);
              if (plan !== null) {
                // Update Total Amount
                const { total_amount } = paymentInfoDataSet;

                setGetPaymentInfoDataSet({
                  ...paymentInfoDataSet,
                  total_amount: total_amount + plan.ins_value,
                });
              }
            }}
            key={"insurance_tab"}
            items={insuranceDataSet.items}
            details={insuranceDataSet.details}
            description={insuranceDataSet.description}
            title={insuranceDataSet.title}
            subheader={insuranceDataSet.subheader}
            meta={insuranceDataSet.meta}
            selectedBankPartner={selectedInsuranceBankPartnerItem}
            onCompleted={(item) => {
              setSelectedInsuranceBankPartnerItem(item);
              setCurrentTab(1);
              setConfiguration({
                ...configurationInfo,
                insurancePartner: item,
              });
            }}
          />
        );
      case 1:
        return (
          <FinanceTab
            key={"finance_tab"}
            items={financeDataSet.items}
            content={financeDataSet.content}
            details={financeDataSet.details}
            tenure={financeDataSet.tenure}
            kyc_info={configurationInfo.kyc_info}
            selectedBankPartner={selectedFinanceBankPartnerItem}
            total_amount={financeDataSet.total_amount}
            onCompleted={(financeData, isNone, variantId) => {
              const { partner, emi_plans, loan_info, tenure } = financeData;
              // in case [i dont need one\direct_payment]
              if (isNone) {
                // Move To Payment Tab With Initial Info
                setConfiguration({
                  ...configurationInfo,
                  variant: variantId,
                  loanInfo: loan_info, // Initial Data
                });
                console.log(financeData);

                setSelectedFinanceBankPartnerItem({
                  ...selectedFinanceBankPartnerItem,
                  ...financeData,
                });
              } else {
                // Move to Payment tab With Info
                console.log(configurationInfo);

                setConfiguration({
                  ...configurationInfo,
                  loanInfo: loan_info,

                  financePartner: partner,
                });
                setSelectedFinanceBankPartnerItem(financeData);
              }

              setCurrentTab(2);
            }}
          />
        );

      case 2:
        return (
          <PaymentGatewayTab
            formUserData={configurationInfo.userDetail}
            kyc_info={configurationInfo?.kyc_info}
            loanInfo={configurationInfo.loanInfo}
            onCompleted={(d) => {}}
            selectedFinanceItem={configurationInfo.financePartner}
            selectedInsuranceItem={configurationInfo.insurancePartner}
            isSandbox={isSandbox}
          />
        );
    }
  };

  const showTabView = () => (
    <div>
      <div className="grid grid-cols-6 px-7 md:px-20">
        <div className="col-span-5  ">
          <h3 className=" configuration-header-text font-medium  text-gray mt-5 mb-2 disketMono">
            PAYMENT
          </h3>
        </div>
        <div className="col-span-1  ml-auto mt-6 sm:mt-7">
          <Image
            width={110}
            height={50}
            src={"/images/payments/group.png"}
            alt="Group"
          />
        </div>
      </div>

      <div className="px-7 md:px-20 mt-2">
        <SideTabs
          key={"sidetabs__"}
          appendIndex
          selected={currentTab}
          onSelect={(i) => {
            setCurrentTab(i);
          }}
          list={tabs.map((tab) => tab.text.toUpperCase())}
        />
      </div>

      {!isLoading && showTabs(currentTab)}
    </div>
  );

  const showKYCFormView = () => (
    <KYCForm
      className="px-7 md:px-20"
      nextHandlerTapped={(kyc_info) => {
        // setPaymentConfigurationInfo()
        // Set KYC
        userData.is_kyc_verified = true;
        setConfiguration({ ...configurationInfo, kyc_info });
      }}
      key="kyc"
    />
  );

  return (
    <>
      <Script src="/js/hotjar.js" strategy="afterInteractive" />
      {/* <Script src={sandboxURL} strategy="afterInteractive" /> */}
      <Head>
        <title>Ultraviolette Automotive | Payment Configuration</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <GraphTags
          title="Ultraviolette Automotive | Payment Configuration"
          description=""
          image=""
          url="https://www.ultraviolette.com/payments"
        />
      </Head>
      <div className="payment-configuration ">
        {/* Header */}

        {loader && (
          <div className="flex justify-center bg-[#1E1E1E] text-white relative">
            <LottiePlayer autoplay loop src={wheenLoading} />
          </div>
        )}

        {!loader && (
          <div className="grid lg:grid-cols-2 md:grid-cols-2 ">
            {/* Content Tabs go here */}
            <div className=" md:col-span-1  sm:order-first scrollSection">
              {userData?.is_kyc_verified ? showTabView() : showKYCFormView()}
            </div>

            {/*  Image Will be displayed Here */}
            {!variantImage.isLoading && (
              <div className="flex col-span-1 order-first noScroll">
                {/* For Desktop */}
                <div
                  className="hidden md:block"
                  style={{
                    width: "100%",
                    height: "calc(100vh - 64px)",
                    position: "relative",
                  }}
                >
                  <Image
                    style={{ objectFit: "cover" }}
                    // @ts-ignore
                    src={variantImage.variant.image}
                    alt="carousel"
                    fill
                  />
                </div>

                {/* For Mobile */}
                <div
                  className="md:hidden"
                  style={{
                    width: "100%",
                    height: "calc(50vh - 64px)",
                    position: "relative",
                  }}
                >
                  <Image
                    style={{ objectFit: "cover" }}
                    // @ts-ignore
                    src={variantImage.variant.image}
                    alt="carousel"
                    fill
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const country = context?.query?.country;

  return {
    props: {
      country: country,
    },
  };
}

export default PaymentConfiguration;
