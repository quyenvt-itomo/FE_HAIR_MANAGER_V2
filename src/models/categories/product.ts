import { ApiRequestQuery } from "../base/api_request_model";
import { ApiResponse } from "../base/api_response_model";
import {
  CategoryData,
  HairQualityData,
  HairToneData,
  HairTypeData,
  LengthData,
  ProductTypeData,
} from "./attribute";
import { UnitData } from "./unit";
import { WarehouseData } from "./warehouse";

export interface ProductQuery extends ApiRequestQuery {
  more_query?: any;
  type?: string;
}

export interface ProductData {
  id: number;
  name: string;
  code: string;
  price: number;
  detail: string;
  initial_balance: number;
  hair_color: string;
  string_color: string;
  quality: string;
  hair_type_detail: string;
  rubber_band_color: string;
  no_tail_cut: boolean;
  pictures: string[];
  description: string;

  category_id?: number;
  category_data?: CategoryData;

  type_id?: number;
  type_data?: ProductTypeData;

  unit_id?: number;
  unit_data?: UnitData;

  warehouse_default_id?: number;
  warehouse_data?: WarehouseData;

  hair_tone_id?: number;
  hair_tone_data?: HairToneData;

  hair_quality_id?: number;
  hair_quality_data?: HairQualityData;

  hair_type_id?: number;
  hair_type_data?: HairTypeData;

  length_id?: number;
  length_data?: LengthData;

  length_cm?: number;
  length_inch?: number;
  material_id?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProductResponse extends ApiResponse {}
