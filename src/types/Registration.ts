export interface Registration {
  firstName: string;
   lastName: string;
   email: string;
   login: string;
   password: string;
   avatarUrl?: string;
  isClient?: boolean;
  isHost?: boolean;
  isAdmin?: boolean;
}
