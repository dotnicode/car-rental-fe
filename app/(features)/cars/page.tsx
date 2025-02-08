import { PaletteIcon, ThermometerIcon, UsersIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Car } from "@/features/car/types/car.type";
import Link from "next/link";

const getCars = async (): Promise<Car[]> => {
  const res = await fetch("http://localhost:4000/api/car");
  const data = await res.json();
  return data;
};

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <main className="space-y-6 mx-auto max-w-6xl">
      {cars.map((car, index) => (
        <article
          key={car.id}
          className="gap-3 grid grid-cols-1 md:grid-cols-3 dark:bg-muted shadow rounded-lg h-auto overflow-hidden"
        >
          <figure className="relative col-span-1 w-full h-48 md:h-full aspect-video">
            <Image
              src={
                car.pictures[0]
                  ? car.pictures[0].src
                  : "/vehicle-placeholder.png"
              }
              alt={car.brand}
              fill
              priority
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="flex flex-col justify-between md:col-span-2 p-4">
            <div className="flex flex-col items-start">
              <header>
                <h2 className="font-bold text-lg">{car.brand}</h2>
              </header>

              <dl className="text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Modelo y precio</dt>
                  <dd className="flex items-center gap-2">
                    Modelo: <strong>{car.model}</strong>
                  </dd>
                </div>

                <div className="flex items-center gap-2">
                  <dt className="sr-only">Precio</dt>
                  <dd className="flex items-center gap-2">
                    Precio por día:{" "}
                    <strong>
                      {Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      }).format(car.pricePerDay)}
                    </strong>
                  </dd>
                </div>

                <div className="mt-4">
                  <dt className="sr-only">Características</dt>
                  <dd className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4" /> {car.passengers}{" "}
                      pasajeros
                    </span>
                    <span className="flex items-center gap-1">
                      <ThermometerIcon className="w-4 h-4" />
                      {car.ac ? "Con A/C" : "Sin A/C"}
                    </span>
                    <span className="flex items-center gap-1 capitalize">
                      <PaletteIcon className="w-4 h-4" /> {car.color}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex justify-end mt-4">
              <Link href={`/cars/${car.id}`}>
                <Button variant="default" className="w-full md:w-40">
                  Solicitar
                </Button>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </main>
  );
}
