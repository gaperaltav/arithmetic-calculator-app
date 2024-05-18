export interface User {
  id: number;
  userName: string;
  password: string;
  status: UserStatus;
  balance: string;
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
