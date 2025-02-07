import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car } from "../types/car.type";
import { Picture } from "../types/picture.type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function CarGrid({ cars }: { cars: Car[] }) {
  if (!cars) {
    return <div>No hay coches disponibles</div>;
  }

  if (cars.length === 0) {
    return <div>No hay coches disponibles</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {cars.map((car: Car) => (
        <Card key={car.id}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={
                car.pictures && car.pictures.length > 0
                  ? car.pictures[0].src
                  : "/placeholder-car.webp"
              }
              alt={
                car.pictures && car.pictures.length > 0
                  ? car.pictures[0].title
                  : "No hay imagen disponible"
              }
              fill
              className="w-full h-full object-cover"
            />
          </AspectRatio>

          <CardHeader>
            <CardTitle>
              {car.brand} {car.model}
            </CardTitle>
            <CardDescription>
              Color: {car.color} - Passengers: {car.passengers}
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <Button>Ver más</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
