interface User {
  id: number;
  userName: string;
  password: string;
  status: UserStatus;
}

type Operation = {
  id: number;
  type: OperationType;
  cost: number;
};

/** Enums */

enum UserStatus {
  inactive = 0,
  active = 1,
}

enum OperationType {
  addition = 1,
  subtraction,
  multiplication,
  division,
  square_root,
  random_string,
}
