import { ApiRequestQuery } from "../base/api_request_model";
import { ApiResponse } from "../base/api_response_model";
import { AttributeData, UnitData } from "../categories/attribute";
import { ProductData } from "../categories/product";
import { SupplierData } from "../categories/supplier";
import { WarehouseData } from "../categories/warehouse";
import { EmployeeData } from "../employee";

export interface PurchaseQuery extends ApiRequestQuery {
  moreQuery?: any;
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
  hairColor: AttributeData;
  unit: UnitData;
  warehouse: WarehouseData;
  description?: string;
}

export interface PurchaseData {
  id: number;
  timeAt?: Date;
  phoneNumber: string;
  address?: string | null;
  purchaseNumber: string;
  description?: string | null;
  totalPrice: number;

  supplierId?: number;
  supplier?: SupplierData;

  employeeId?: number;
  employee?: EmployeeData;

  // TODO: to Add
  details: PurchaseDetailData[];

  // TODO: to Update
  adds: PurchaseDetailData[];
  updates: PurchaseDetailData[];
  deletes: number[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PurchaseResponse extends ApiResponse {}
