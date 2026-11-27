/**
 * Domain models shared by the services and the feature components.
 * They mirror the JSON contract of the Coupon System REST API.
 */

export interface Company {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

/** Coupon categories, in the wording the API and the UI both use. */
export enum CouponCategory {
  Food = 'Food',
  Electricity = 'Electricity',
  Restaurant = 'Restaurant',
  Vacation = 'Vacation',
  Fashion = 'Fashion',
}

export const COUPON_CATEGORIES: readonly CouponCategory[] = Object.values(CouponCategory);

export interface Coupon {
  id?: number;
  companyId?: number;
  category: CouponCategory | string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  amount: number;
  price: number;
  image?: string;
}

/** The three account types the login screen can authenticate. */
export type ClientType = 'admin' | 'company' | 'customer';

/** Values used by the client-type select in the login form. */
export const CLIENT_TYPE_BY_VALUE: Record<string, ClientType> = {
  '1': 'admin',
  '2': 'company',
  '3': 'customer',
};
