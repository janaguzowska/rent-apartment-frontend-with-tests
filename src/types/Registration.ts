export interface Registration {
  firstName: string;
   lastName: string;
   email: string;
   login: string;
   password: string;
   avatarUrl?: string;
  isCustomer?: boolean;
  isHost?: boolean;
}
