/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NGO, VolunteerOpportunity, VolunteerContribution } from './types.ts';

export const MOCK_NGOS: NGO[] = [
  {
    id: '1',
    name: 'BRAC',
    description: 'A global leader in developing cost-effective, evidence-based programs in conflict-prone and post-disaster settings.',
    category: 'Large NGO',
    sdgs: [1, 3, 4, 5, 8],
    district: 'Dhaka',
    location: 'Mohakhali, Dhaka',
    website: 'https://brac.net',
    isVerified: true,
    logo: 'B',
    color: '#006A4E'
  },
  {
    id: 'bylc',
    name: 'Bangladesh Youth Leadership Center',
    description: 'BYLC aims to create a more inclusive, tolerant, and just society by training the next generation of leaders.',
    category: 'Large NGO',
    sdgs: [4, 8, 10, 16],
    district: 'Dhaka',
    location: 'Baridhara, Dhaka',
    website: 'https://bylc.org',
    isVerified: true,
    logo: 'BYLC',
    color: '#003366'
  },
  {
    id: 'ann',
    name: 'Amra Notun Network',
    description: 'A platform backed by BRAC focusing on youth development, health, and climate action across Bangladesh.',
    category: 'Large NGO',
    sdgs: [3, 4, 13, 17],
    district: 'Dhaka',
    location: 'Dhaka Central',
    isVerified: true,
    logo: 'ANN',
    color: '#D4AF37'
  },
  {
    id: 'serac',
    name: 'SERAC-Bangladesh',
    description: 'A youth-pro-active non-profit organization focused on sexual and reproductive health, rights, and gender equality.',
    category: 'Small NGO',
    sdgs: [5, 10, 16, 17],
    district: 'Mymensingh',
    location: 'Mymensingh Town',
    website: 'https://serac-bd.org',
    isVerified: true,
    logo: 'S',
    color: '#E63946'
  },
  {
    id: '1di',
    name: 'One Degree Initiative Foundation',
    description: 'Empowering youth through innovation, infrastructure development, and education.',
    category: 'Small NGO',
    sdgs: [4, 8, 9, 17],
    district: 'Dhaka',
    location: 'Banani, Dhaka',
    isVerified: true,
    logo: '1°',
    color: '#1A535C'
  },
  {
    id: 'a360',
    name: 'Awareness 360',
    description: 'A youth-led organization that empowers young people all over the world to engage in community service.',
    category: 'Community Project',
    sdgs: [4, 13, 17],
    district: 'Dhaka',
    location: 'Dhaka South',
    isVerified: true,
    logo: 'A',
    color: '#FF9F1C'
  },
  {
    id: 'vbd',
    name: 'Volunteer for Bangladesh',
    description: 'The youth arm of JAAGO Foundation, creating one of the largest volunteer networks in the country.',
    category: 'Large NGO',
    sdgs: [3, 4, 11, 13],
    district: 'Dhaka',
    location: 'Panthapath, Dhaka',
    website: 'https://vbd.com.bd',
    isVerified: true,
    logo: 'VBD',
    color: '#2EC4B6'
  },
  {
    id: 'ycb',
    name: 'Youth Club of Bangladesh',
    description: 'A platform for youth to engage in social work and community development.',
    category: 'Community Project',
    sdgs: [3, 4, 13],
    district: 'Chattogram',
    location: 'Chattogram City',
    isVerified: true,
    logo: 'Y',
    color: '#7209B7'
  },
  {
    id: 'yfb',
    name: 'Youth for Bangladesh',
    description: 'Focusing on poverty reduction and educational equality for marginalized communities.',
    category: 'Small NGO',
    sdgs: [1, 4, 10],
    district: 'Rajshahi',
    location: 'Rajshahi Town',
    isVerified: true,
    logo: 'YFB',
    color: '#4361EE'
  },
  {
    id: 'jaago',
    name: 'Jaago Foundation',
    description: 'Working towards breaking the cycle of poverty through quality education for underprivileged children.',
    category: 'Large NGO',
    sdgs: [4, 10, 17],
    district: 'Dhaka',
    location: 'Banani, Dhaka',
    website: 'https://jaago.com.bd',
    isVerified: true,
    logo: 'J',
    color: '#FF6F61'
  },
  {
    id: 'actionaid',
    name: 'ActionAid Bangladesh',
    description: 'A global movement of people working together to further human rights and defeat poverty.',
    category: 'Large NGO',
    sdgs: [5, 10, 13],
    district: 'Dhaka',
    location: 'Gulshan, Dhaka',
    isVerified: true,
    logo: 'AA',
    color: '#BA181B'
  },
  {
    id: 'save-children',
    name: 'Save the Children',
    description: 'The leading independent organization for children in need, with programs in over 120 countries.',
    category: 'Large NGO',
    sdgs: [3, 4, 16],
    district: 'Dhaka',
    location: 'Gulshan, Dhaka',
    isVerified: true,
    logo: 'S',
    color: '#E01E37'
  },
  {
    id: 'wfp',
    name: 'World Food Programme',
    description: 'The food-assistance branch of the United Nations and the world\'s largest humanitarian organization addressing hunger.',
    category: 'Large NGO',
    sdgs: [2, 3, 17],
    district: 'Cox\'s Bazar',
    location: 'Ukhia, Cox\'s Bazar',
    isVerified: true,
    logo: 'WFP',
    color: '#007DBC'
  },
  {
    id: 'undp',
    name: 'UNDP Bangladesh',
    description: 'The United Nations Development Programme helps countries eliminate poverty and achieve sustainable human development.',
    category: 'Large NGO',
    sdgs: [1, 8, 10, 17],
    district: 'Dhaka',
    location: 'IDB Bhaban, Dhaka',
    isVerified: true,
    logo: 'UNDP',
    logoUrl: '/input_file_0.png',
    color: '#006EB5'
  },
  {
    id: 'unicef',
    name: 'UNICEF Bangladesh',
    description: 'UNICEF works in over 190 countries and territories to save children\'s lives, to defend their rights.',
    category: 'Large NGO',
    sdgs: [3, 4, 10],
    district: 'Dhaka',
    location: 'BSL Office Complex, Dhaka',
    isVerified: true,
    logo: 'U',
    color: '#1CABE2'
  },
  {
    id: 'colab',
    name: 'Youth Co:Lab',
    description: 'Co-created by UNDP and Citi Foundation, Youth Co:Lab establishes a common agenda for countries in Asia-Pacific to empower youth.',
    category: 'Small NGO',
    sdgs: [8, 9, 17],
    district: 'Dhaka',
    location: 'Dhaka Central',
    isVerified: true,
    logo: 'YCL',
    color: '#CC0000'
  },
  {
    id: '3zero',
    name: '3ZERO Club',
    description: 'A global initiative to create a world of three zeros: zero net carbon emission, zero wealth concentration, and zero unemployment.',
    category: 'Community Project',
    sdgs: [1, 8, 13],
    district: 'Dhaka',
    location: 'Yunus Centre, Dhaka',
    isVerified: true,
    logo: '3Z',
    color: '#000000'
  },
  {
    id: '64d',
    name: '64D Initiatives',
    description: 'Focusing on innovation and partnership across all 64 districts of Bangladesh.',
    category: 'Small NGO',
    sdgs: [8, 9, 17],
    district: 'Sylhet',
    location: 'Sylhet City',
    isVerified: true,
    logo: '64D',
    color: '#004B23'
  }
];

export const MOCK_VOLUNTEER_OPPS: VolunteerOpportunity[] = [
  {
    id: 'v1',
    ngoId: '2',
    ngoName: 'Bidyanondo Foundation',
    title: 'Distribution Volunteer',
    description: 'Help us distribute food packages to families in local slums.',
    location: 'Mirpur-12, Dhaka',
    date: '2026-05-10',
    time: '10:00 AM - 02:00 PM',
    type: 'Emergency Aid'
  },
  {
    id: 'v2',
    ngoId: '4',
    ngoName: 'Student Help Hub',
    title: 'Math Tutor',
    description: 'Looking for university students to teach basic math to grade 5 students.',
    location: 'Agrabad, Chattogram',
    date: 'Every Saturday',
    time: '03:00 PM - 05:00 PM',
    type: 'Education'
  },
  {
    id: 'v3',
    ngoId: '5',
    ngoName: 'Green Sylhet Initiative',
    title: 'Plantation Worker',
    description: 'Volunteer for a massive tea garden reforestation drive.',
    location: 'Malnicherra, Sylhet',
    date: '2026-05-20',
    time: '08:00 AM - 12:00 PM',
    type: 'Environment'
  }
];

export const MOCK_USER_CONTRIBUTIONS: VolunteerContribution[] = [
  {
    id: 'c1',
    ngoName: 'BRAC',
    projectName: 'Education for All',
    hours: 24,
    date: '2026-03-15',
    role: 'Tutor'
  },
  {
    id: 'c2',
    ngoName: 'Green Sylhet Initiative',
    projectName: 'Tea Garden Reforestation',
    hours: 12,
    date: '2026-04-02',
    role: 'Planter'
  },
  {
    id: 'c3',
    ngoName: 'Bidyanondo Foundation',
    projectName: 'One Taka Meal',
    hours: 8,
    date: '2026-04-20',
    role: 'Server'
  }
];
