import { ObjectId } from "mongodb";

export type PromotionSchemaTypes = {
  productId: ObjectId;
  _id: string;
  days: number;
  isTodaysPromo: boolean;
  fixedPromo: number;
  percentagePromo: number;
  createdAt: Date;
  expiresAt: Date;
};

export type PromotionTypesProps = {
  isModalOpen: boolean;
  closeModalHandler: () => void;
  createHandler: (
    inputs: inputsTypes,
    checkboxInputs: checkboxInputsTypes
  ) => void;
};

export type inputsTypes = {
  price: string;
  days: string;
};

export type checkboxInputsTypes = {
  isPercentage: boolean;
  isTodaysPromo: boolean;
};
