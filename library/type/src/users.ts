export interface IPermission {
  code: string;
  displayName: string;
}

export interface IRole {
  code: string;
  displayName: string;
  permissions: IPermission[];
}

export interface IClaim {
  key: string;
  value: string;
}

export interface IUser {
  uuid: string;
  email: string;
  roles: IRole[];
  claims: IClaim[];
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
