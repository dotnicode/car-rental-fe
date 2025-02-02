import { Picture } from "./picture.type";

export type Car = {
  id: number;
  brand: string;
  model: string;
  pictures: Picture[];
  color: string;
  passengers: number;
  ac: boolean;
  pricePerDay: number;
  createdAt: Date;
  updatedAt: Date;
};
