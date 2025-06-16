import { ApiRequestQuery } from "../base/api_request_model";
import { ApiResponse } from "../base/api_response_model";
import { AttributeData, UnitData } from "../categories/attribute";
import { ProductData } from "../categories/product";
import { SupplierData } from "../categories/supplier";
import { WarehouseData } from "../categories/warehouse";
import { EmployeeData } from "../employee";

export interface PurchaseQuery extends ApiRequestQuery {
  more_query?: any;
  type?: string;
}

export interface PurchaseDetailData {
  id: number;
  size: number;
  quantity: number;
  price: number;
  discount: number;
  vat: number;
  product: ProductData;
  hair_color: AttributeData;
  unit: UnitData;
  warehouse: WarehouseData;
  description?: string;
}

export interface PurchaseData {
  id: number;
  time_at?: Date;
  phone_number: string;
  address?: string | null;
  purchase_number: string;
  description?: string | null;
  total_price: number;

  supplier_id?: number;
  supplier?: SupplierData;

  employee_purchase_id?: number;
  employee_purchased?: EmployeeData;

  // TODO: to Add
  purchase_detail: PurchaseDetailData[];

  // TODO: to Update
  purchase_detail_create: PurchaseDetailData[];
  purchase_detail_update: PurchaseDetailData[];
  purchase_detail_delete: number[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PurchaseResponse extends ApiResponse {}
