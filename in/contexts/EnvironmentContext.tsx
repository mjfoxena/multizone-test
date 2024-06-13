import React, { useState, createContext, useEffect, useContext } from "react";
import router, { useRouter } from "next/router";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

type EnvirionmentProps = {
  environment: string; // [production, dev, preview]
  paymentMode: string; // [sandbox, prod]
  isProduction: boolean; // [true/false]
  isSandbox: boolean; // [true/false]
};

const prodEnvConstants = "production";
const sandboxPaymentMode = "sandbox";
const prodPaymentMode = "prod";

export const EnvirionmentContext = createContext<EnvirionmentProps>({
  environment: prodEnvConstants,
  isProduction: true,
  isSandbox: false,
  paymentMode: prodPaymentMode,
});

export default function EnvirionmentContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [environment, setEnvironment] = useState(prodEnvConstants);
  const [isProduction, setIsProduction] = useState(true);
  const [isSandbox, setIsSandbox] = useState(false);
  const [paymentMode, setPaymentMode] = useState(prodPaymentMode);

  const [publicConfig, setPublicConfig] = useState<any>();

  useEffect(() => {
    if (publicRuntimeConfig) {
      const env = publicRuntimeConfig.envirionment || prodEnvConstants;
      const isProduction = env === prodEnvConstants;
      const paymentMode = publicRuntimeConfig.paymentMode || prodPaymentMode;
      const isSandbox = paymentMode === sandboxPaymentMode;

      setEnvironment(env);
      setPaymentMode(paymentMode);

      setIsProduction(isProduction);
      setIsSandbox(isSandbox);
      setPublicConfig({ ...publicConfig });
    }
  }, [serverRuntimeConfig, publicRuntimeConfig]);

  return (
    <EnvirionmentContext.Provider
      value={{
        environment,
        isProduction,
        isSandbox,
        paymentMode,
      }}
    >
      {children}
    </EnvirionmentContext.Provider>
  );
}
