import { SetStateAction } from "react";

export interface BotRequestMessage {
  role: string;
  content: string;
  action: string;
}

export interface ContentBodyProps {
  isMobile: boolean;
  isLoggedIn: boolean;
  userEmail?: string;
  setUserEmail: React.Dispatch<SetStateAction<string | undefined>>;
}
export interface SidebarProps {
  isMobile: boolean;
  isLoggedIn: boolean;
  setUserEmail: React.Dispatch<SetStateAction<string | undefined>>;
}

export interface LeaderDistanceCardProps {
  index: number;
  isTop: boolean;
  isMobile: boolean;
  slNo: number;
  name: string;
  kmCovered: string;
  breakpoint: string;
}
export interface LeaderRangeCardProps {
  index: number;
  isTop: boolean;
  isMobile: boolean;
  slNo: number;
  name: string;
  rangeCovered: string;
}

export interface DefaultResponsive {
  isMobileWindow: boolean;
  isDesktopWindow: boolean;
  isXtraLargeWindow: boolean;
  is2XlLargeWindow: boolean;
  isTabWindow: boolean;

  breakpoint: string;
  width: number;
  height: number;
}

export interface IImageConfig {
  [key: string]: string[];
}
export interface IConfigImageCombination {
  base_url: string;
  image_config: IImageConfig;
}

// config types
interface OptionsData {
  emi_mo: number;
  name: string;
  price: number;
}

interface SubCategoryData {
  category: string;
  category_desc: string;
  category_name: string;
  changeable: boolean;
  default: string;
  display_image_video: string;
  included: boolean;
  options: string[];
  options_data: OptionsData[];
  single_multi_all: string;
  visibility: string;
}

interface ConfigDetails {
  category: string;
  category_desc: string;
  category_name: string;
  changeable: boolean;
  default?: string;
  display_image_video: string;
  included: boolean;
  options?: string[];
  options_data?: OptionsData[];
  single_multi_all: string;
  sub_categories?: string[];
  sub_categories_data?: SubCategoryData[];
  visibility: string;
}

interface ModelDetails {
  model_id: string;
  model_name: string;
  variant_id: string;
  variant_name: string;
  variant_properties: {
    book_today_price: string;
    emi_mo: string;
    feature_cards: string[];
    full_price: string;
    performance: string;
    range: string;
    range_progress: string;
    smart_tech: string;
    warranty: string;
    warranty_progress: string;
  };
  version_id: string;
  version_name: string;
}

export interface IConfigDetails {
  config_details: ConfigDetails[];
  model_details: ModelDetails;
}

// new profile interface
