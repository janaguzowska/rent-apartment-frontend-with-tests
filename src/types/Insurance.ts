import { InsuranceDetail } from './InsuranceDetail.ts';

export interface Insurance {
  title: string;
  price: string;
  details: InsuranceDetail[];
}
