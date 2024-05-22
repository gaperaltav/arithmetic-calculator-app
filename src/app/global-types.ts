export interface User {
  id: string;
  name: string | null;
  status: string | null;
  email: string;
  password: string | null;
  balance: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdDate: string;
  updatedDate: string | null;
  deletedDate: string | null;
}

export type Operation = {
  id: number;
  type: OperationType;
  cost: number;
};

/** Enums */
export enum UserStatus {
  inactive = 0,
  active = 1,
}

export enum OperationType {
  addition = 1,
  subtraction,
  multiplication,
  division,
  square_root,
  random_string,
}
