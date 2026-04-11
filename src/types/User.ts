import { PermissionType } from './PermissionType.ts';

export interface User {
  id?: number;
  login?: string;
  password?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  isHost?: boolean;
  isClient?: boolean;
  permissions?: PermissionType[];
}
