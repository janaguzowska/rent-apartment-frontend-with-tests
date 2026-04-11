import { IMAGE_URL } from '../const.ts';

export const getImageUrl = (i: number) => `${IMAGE_URL}/${(i % 20) + 1}.jpg`;
