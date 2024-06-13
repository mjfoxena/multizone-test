import axios from "axios";
import { useQuery } from "react-query";
import {
  GetPricingDetails,
  GetFaqList,
  GetSpecSheet,
  GetLimitedPricingDetails,
  GetSpaceLimitedPricingDetails,
  GetPricingFactor,
  GetLimitedAvailableStatus,
  GetLimitedSpaceAvailableStatus,
  GetChoseVarient,
  Getupdatedpricing,
  GetSummary,
} from "../services/configuratorService";
import { API_CONSTANTS } from "../services/config";

export function usePricingDetails(country, onSuccess) {
  const { data, error, isLoading } = useQuery(
    ["GetPricingDetails", country],
    () => GetPricingDetails(country),
    {
      retry: 2,
      onSuccess,
    }
  );
  return { data, error, isLoading };
}

export function useFaqList(onSuccess) {
  const { data, error, isLoading } = useQuery("GetFaqList", GetFaqList, {
    retry: 2,
    onSuccess,
  });
  return { data, error, isLoading };
}
export function useLimitedPricingDetails(onSuccess) {
  const { data, error, isLoading } = useQuery(
    "GetLimitedPricingDetails",
    GetLimitedPricingDetails,
    {
      retry: 2,
      onSuccess,
    }
  );
  return { data, error, isLoading };
}

export function useSpaceimitedPricingDetails(onSuccess) {
  const { data, error, isLoading } = useQuery(
    "GetSpaceLimitedPricingDetails",
    GetSpaceLimitedPricingDetails,
    {
      retry: 2,
      onSuccess,
    }
  );
  return { data, error, isLoading };
}
export function useLimitedAvailableStatus(onSuccess) {
  const { data, error, isLoading } = useQuery(
    "GetLimitedAvailableStatus",
    GetLimitedAvailableStatus,
    {
      retry: 2,
      onSuccess,
    }
  );
  return { data, error, isLoading };
}

export function useLimitedSpaceAvailableStatus(onSuccess) {
  const { data, error, isLoading } = useQuery(
    "GetLimitedSpaceAvailableStatus",
    GetLimitedSpaceAvailableStatus,
    {
      retry: 2,
      onSuccess,
    }
  );
  return { data, error, isLoading };
}

export function usePricingFactor(onSuccess) {
  const { data, error, isLoading } = useQuery(
    "getpricingfactor",
    GetPricingFactor,
    {
      retry: 2,
      onSuccess,
    }
  );
  return { data, error, isLoading };
}

export function ConfigCombination(variant) {
  const getConfig = () => {
    return axios.get(
      `https://s3.ap-south-1.amazonaws.com/www.ultraviolette.com/configurator_combination${
        variant === "limited" ? "_se" : ""
      }_images.json`
    );
  };
  return getConfig();
}

export function NewConfigImages() {
  const getConfig = () => {
    return axios.get(
      `${API_CONSTANTS.BASE_IMAGE_URL_CDN}/configurator_combination_images_refresh.json`
    );
  };
  return getConfig();
}

export function useSpecSheet() {
  return useQuery("spec-sheet", GetSpecSheet);
}

// New Config APIs
export function useChoseVarient(bikedata, onSuccess) {
  const { data, error, isLoading } = useQuery(
    ["GetChoseVarient", bikedata],
    () => GetChoseVarient(bikedata),
    {
      retry: 2,
      onSuccess,
    }
  );
  return { data, error, isLoading };
}

// Updated Pricing APIs
export function useUpdatedPricing(selected_items, onSuccess) {
  const { data, error, isLoading } = useQuery(
    ["Getupdatedpricing", selected_items],
    () => Getupdatedpricing({ selected_items }), 
    {
      retry: 2,
      onSuccess,
    }
  );
  return { data, error, isLoading };
}

export function useSummary(email, onSuccess) {
  const { data, error, isLoading } = useQuery(
    ["GetSummary", email],
    () => GetSummary(email),
    {
      retry: 2,
      onSuccess,
    }
  );
  return { data, error, isLoading };
}
