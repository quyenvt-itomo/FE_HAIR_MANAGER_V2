import { ActionType } from "../enums/ActionType";
import { TypeMessage } from "../enums/typeMessage";

export interface MessageToastModel {
	type: TypeMessage;
	message?: string;
	action?: ActionType;
}
