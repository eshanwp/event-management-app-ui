import { ActionTypeEnum } from "../enums/action-type.enum.ts";

export default interface DrawerDataModal<T> {
     isOpen: boolean;
     title?: string;
     actionType?: ActionTypeEnum;
     data?: T;
}
