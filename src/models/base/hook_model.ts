import { ApiRequestQuery } from "./api_request_model";
import { FiltersModel } from "./filter_propover_model";

export interface UseDataParams extends ApiRequestQuery {
  isLockHook?: boolean;
  filters?: FiltersModel;
  onCloseModal?: () => void;
}
