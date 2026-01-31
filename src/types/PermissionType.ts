export type PermissionType = 'ADMIN' | 'CLIENT' | 'HOST';

export const getPermissionTypeForField = (field: string): PermissionType => {
  switch (field) {
    case 'isHost':
      return 'HOST';
    case 'isAdmin':
      return 'ADMIN';
    default:
      return 'CLIENT';
  }
};
