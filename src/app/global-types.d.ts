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
