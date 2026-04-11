import { StepParams } from './types/StepParams.ts';

export const BASE_URL = 'http://localhost:8099';
export const OFFER_URL = `${BASE_URL}/offer`;
export const OFFER_SEARCH_URL = `${OFFER_URL}/search`;
export const IMAGE_URL = `${BASE_URL}/image`;
export const AVATAR_URL = `${BASE_URL}/avatar`;
export const RESERVATION_URL = '/reservation';

export const RATING_TITLES = [
  'terribly',
  'badly',
  'not bad',
  'good',
  'perfect',
];
export const MIN_ADULTS = 1;
export const MAX_ADULTS = 10;
export const MIN_CHILDREN = 0;
export const MIN_ROOMS = 1;

const offerPath = (id: string) => `/offer/${id}`;
export const reservationBasePath = (id: string) =>
  `${offerPath(id)}/reservation`;
const stepPath = (path: string) => (id: string) =>
  `${reservationBasePath(id)}/${path}`;

export const RESERVATION_STEPS: StepParams[] = [
  { label: 'Selected offer', path: offerPath },
  { label: 'Participants', path: stepPath('participants') },
  // {label: 'Insurance', path: stepPath('insurance')},
  // {label: 'Tour', path: stepPath('tour')},
  { label: 'Summary', path: stepPath('summary') },
];

export const getStepParams = (id: string, path: string) =>
  RESERVATION_STEPS.find((step) => step.path(id) === path)!;

export const getStepIndex = (id: string, path: string) =>
  RESERVATION_STEPS.findIndex((step) => step.path(id) === path);

export const getPreviousStepParams = (id: string, path: string) => {
  const currentStepIndex = getStepIndex(id, path);
  return RESERVATION_STEPS[currentStepIndex - 1];
};

export const getNextStepPath = (id: string, path: string) =>
  RESERVATION_STEPS[getStepIndex(id, path) + 1].path(id);
export const getBackStepPath = (id: string, path: string) =>
  RESERVATION_STEPS[getStepIndex(id, path) - 1].path(id);

export const isNextButtonEnabled = (id: string, path: string) =>
  getStepIndex(id, path) < RESERVATION_STEPS.length - 1;
export const isBackButtonEnabled = (id: string, path: string) =>
  getStepIndex(id, path) > 1;
