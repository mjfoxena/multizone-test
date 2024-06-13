interface IColorData {
  desc: string;
  included: string;
  name: string;
  option_code: string;
  price: number;
  visibility: string;
}

interface IVariantProperties {
  book_today_price: string;
  discount: string;
  discount_desc: string;
  discount_name: string;
  feature_cards: string[];
  full_price: string;
  performance: string;
  range: string;
  range_progress: string;
  smart_tech: string;
  top_speed: string;
  torque: string;
  warranty: string;
  warranty_progress: string;
}

interface IModelData {
  model_id: string;
  model_name: string;
  variant_id: string;
  variant_name: string;
  variant_properties: IVariantProperties;
  version_id: string;
  version_name: string;
}

interface IOptionData {
  desc: string;
  included: string;
  name: string;
  option_code: string;
  price: number;
  visibility: string;
}

interface IBookingDetails {
  color_data: IColorData;
  country: string;
  model: string;
  model_data: IModelData;
  options: string[];
  options_data: IOptionData[];
  variant: string;
  version: string;
}

interface IStage {
  0: boolean;
  1: boolean;
  2: boolean;
  3: boolean;
}

export interface IBookingInfo {
  booking_details: IBookingDetails;
  booking_paid: boolean;
  country: string;
  email: string;
  is_se: boolean;
  is_vip: boolean;
  limited_type: string;
  mach2_customer: boolean;
  model: string;
  name: string;
  order_date: string;
  order_id: string;
  pincode: string;
  reconfigured: boolean;
  stage: IStage;
  state: string;
}
