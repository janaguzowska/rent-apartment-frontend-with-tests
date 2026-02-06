import {Position} from './Position.ts';

export interface City {
  title: string;
  position?: Position;
  zoom?: number;
}
