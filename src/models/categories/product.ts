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
  moreQuery?: any;
  type?: string;
}

export interface ProductData {
  id: number;
  name: string;
  code: string;
  price: number;
  detail: string;
  initial_balance: number;
  hairColor: string;
  stringColor: string;
  quality: string;
  hairTypeDetail: string;
  rubberBandColor: string;
  noTailCut: boolean;
  pictures: string[];
  description: string;

  categoryId?: number;
  category?: CategoryData;

  typeId?: number;
  type?: ProductTypeData;

  unitId?: number;
  unit?: UnitData;

  warehouseId?: number;
  warehouse?: WarehouseData;

  hairToneId?: number;
  hairTone?: HairToneData;

  hairQualityId?: number;
  hairQuality?: HairQualityData;

  hairTypeId?: number;
  hairType?: HairTypeData;

  lengthId?: number;
  length?: LengthData;

  lengthCm?: number;
  lengthInch?: number;
  materialId?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProductResponse extends ApiResponse {}
