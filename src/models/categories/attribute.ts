import { ApiRequestQuery } from "../base/api_request_model";
import { ApiResponse } from "../base/api_response_model";

export type AttributeType =
  | "CATEGORY"
  | "TYPE"
  | "LENGTH"
  | "HAIR_TONE"
  | "HAIR_QUALITY"
  | "HAIR_TYPE"
  | "UNIT";

export interface AttributeQuery extends ApiRequestQuery {
  type: AttributeType;
}
export interface CategoryQuery extends AttributeQuery {
  type: "CATEGORY";
}
export interface ProductTypeQuery extends AttributeQuery {
  type: "TYPE";
}
export interface LengthQuery extends AttributeQuery {
  type: "LENGTH";
}
export interface HairToneQuery extends AttributeQuery {
  type: "HAIR_TONE";
}
export interface HairQualityQuery extends AttributeQuery {
  type: "HAIR_QUALITY";
}
export interface HairTypeQuery extends AttributeQuery {
  type: "HAIR_TYPE";
}
export interface UnitQuery extends AttributeQuery {
  type: "UNIT";
}

export interface AttributeData {
  id: number;
  name: string;
  type: AttributeType;
}

export interface CategoryData extends AttributeData {}
export interface ProductTypeData extends AttributeData {}
export interface LengthData extends AttributeData {}
export interface HairToneData extends AttributeData {}
export interface HairQualityData extends AttributeData {}
export interface HairTypeData extends AttributeData {}
export interface UnitData extends AttributeData {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AttributeResponse extends ApiResponse {}
export interface CategoryResponse extends AttributeResponse {
  data: CategoryData[];
}
export interface ProductTypeResponse extends AttributeResponse {
  data: ProductTypeData[];
}
export interface LengthResponse extends AttributeResponse {
  data: LengthData[];
}
export interface HairToneResponse extends AttributeResponse {
  data: HairToneData[];
}
export interface HairQualityResponse extends AttributeResponse {
  data: HairQualityData[];
}
export interface HairTypeResponse extends AttributeResponse {
  data: HairTypeData[];
}
export interface UnitResponse extends AttributeResponse {
  data: UnitData[];
}
