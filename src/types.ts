/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SDG {
  id: number;
  name: string;
  color: string;
}

export interface NGO {
  id: string;
  name: string;
  description: string;
  category: 'Large NGO' | 'Small NGO' | 'Community Project';
  sdgs: number[]; // Array of SDG IDs
  district: string;
  location: string;
  website?: string;
  email?: string;
  isVerified: boolean;
  logo?: string; // Icon name or character
  logoUrl?: string;
  color?: string;
}

export interface VolunteerOpportunity {
  id: string;
  ngoId: string;
  ngoName: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  type: string; // e.g., "Education", "Health", "Environment"
}

export interface VolunteerContribution {
  id: string;
  ngoName: string;
  projectName: string;
  hours: number;
  date: string;
  role: string;
}

export type FilterState = {
  sdg: number | null;
  district: string;
  search: string;
};
