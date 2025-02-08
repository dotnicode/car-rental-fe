import { Car } from "../types/car.type";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsersIcon, ThermometerIcon, PaletteIcon } from "lucide-react";

export default function CarGrid({ cars }: { cars: Car[] }) {
  if (!cars) {
    return <div>No hay coches disponibles</div>;
  }

  return (
    <div className="space-y-4">
      {cars.map((car) => (
        <Card key={car.id} className="overflow-hidden">
          <div className="flex md:flex-row flex-col">
            <div className="relative w-full md:w-1/3 h-48 md:h-auto">
              <Image
                src={
                  car.pictures && car.pictures.length > 0
                    ? car.pictures[0].src
                    : "/vehicle-placeholder.png"
                }
                alt={car.brand + " " + car.model}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="flex-1 p-4 md:p-6">
              <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <CardTitle className="mb-2 font-bold text-lg">
                    {car.brand} {car.model}
                  </CardTitle>
                  <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4" />
                      {car.passengers} pasajeros
                    </span>
                    <span className="flex items-center gap-1">
                      <ThermometerIcon className="w-4 h-4" />
                      {car.ac ? "Con A/C" : "Sin A/C"}
                    </span>
                    <span className="flex items-center gap-1 capitalize">
                      <PaletteIcon className="w-4 h-4" />
                      {car.color}
                    </span>
                  </div>
                </div>
                <div className="text-right w-full md:w-auto">
                  <div className="text-muted-foreground text-sm">
                    Precio por día
                  </div>
                  <div className="font-bold text-xl">
                    {Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    }).format(car.pricePerDay)}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="w-full md:w-40">Solicitar</Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
