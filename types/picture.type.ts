import { CarPicture } from "../enums/car-picture.enum";
import { Car } from "./car.type";

export type Picture = {
  id: number;
  car: Car;
  src: string;
  description?: string;
  title: string;
  type: CarPicture;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
