import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import LeftSideBar from "../../components/molecules/LeftSideBar";
import { EnvirionmentContext } from "../../contexts/EnvironmentContext";
import { checkPaymentStatus } from "../../services/PaymentService";
import { MapCss } from "../../utils/utils";
import Style from "./paymentstatus.module.scss";
import { GetServerSidePropsContext } from "next";

const PaymentStatusPage = () => {
  const { isSandbox } = useContext(EnvirionmentContext);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [orderId, setOrderId] = useState("");

  const router = useRouter();

  const getPaymentStatus = async (orderId: string) => {
    setIsFetching(true);
    try {
      const response = await checkPaymentStatus(orderId, isSandbox);
      setIsFetching(false);
      // @ts-ignore
      if (response.payload && response.payload.status) {
        console.log("Payment Status: Success", response.payload);
        // Go to congratulations page
        router.push("/profile/congratulation");
      } else {
        console.log("Payment Status: Failed", response.payload);
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    // Get Order Id from the query
    const qOrderId = router.query.order_id?.toString();
    console.log(qOrderId, 'qOrderId');
    

    if (qOrderId) {
      setOrderId(qOrderId);
      getPaymentStatus(qOrderId);
    }
  }, [router?.query.order_id]);

  if (isFetching) {
    return (
      <div className="bg-gray-50 h-screen w-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={"/images/icons/UV Official Logos-01 1.svg"}
            width={1000}
            height={1000}
            alt="Ultraviolette Logo"
            className="w-[138px] h-[138px]"
          ></Image>
          <h1 className="eurostile text-[#272727] text-[22px] font-normal leading-[24px] tracking-[0.2px]">
            Fetching your payment status...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Show payment failed  */}
      {isError && (
        <LeftSideBar rightImageSrc={"/images/payments/payment_failed.png"}>
          <div className="flex flex-col ml-7 mr-7 mb-20 sm:ml-16 sm:pt-8 sm:mb-40 sm:mr-20 justify-between">
            <div className="flex flex-col">
              <div className="mt-4 sm:mt-0 ">
                <div
                  className={MapCss(
                    Style,
                    "heading ",
                    "w-full flex flex-row  justify-between  sm:flex-col"
                  )}
                >
                  UH-OH!
                  <div
                    className={MapCss(Style, "border", "hidden sm:flex")}
                  ></div>
                  <div className="sm:hidden flex items-center ">
                    <Image
                      alt="arrow-right"
                      width={90}
                      height={20}
                      src={"/images/thankyou/thnxlogo.png"}
                    />
                  </div>
                </div>
              </div>
              {/* thank you paragraph */}

              <p className="my-5">
                Seems like your payment has not gone through for Order ID
                <span className="text-lg font-semibold ml-2">{orderId}</span>.
              </p>
              <div
                className={MapCss(
                  Style,
                  "brutal",
                  "text-base font-normal mt-7 sm:mt-10  sm:text-xl"
                )}
              >
                <div className="mb-5 text-xs sm:text-base">
                  If money is deducted from your bank account, it will be fully
                  refunded within 7-10 working days. Please retry after some
                  time. For queries, please write to us at
                  info@ultraviolette.com.
                </div>
              </div>
              {/* button */}
            </div>
          </div>
          <div
            className={MapCss(Style, "procced")}
            onClick={() => router.push("/configure")}
          >
            <div className={Style.proccedText}>GO BACK TO CONFIGURE</div>
            <Image
              alt="arrow-right"
              width={20}
              height={20}
              src={"/images/icons/horizontalWhiteArrow.svg"}
            />
          </div>
        </LeftSideBar>
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const country = context?.query?.country;

  return {
      props: {
          country: country
      },
  };
}


export default PaymentStatusPage;
