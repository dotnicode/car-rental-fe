import { Car } from "@/types/car.type";
import Image from "next/image";
import Link from "next/link";

const getCars = async (): Promise<Car[]> => {
  const res = await fetch("http://localhost:4000/api/car");
  const data = await res.json();
  return data;
};

export default async function CarPage() {
  const cars = await getCars();

  return (
    <div>
      <h1 className="font-bold text-4xl text-zinc-100">Car Rental Solution</h1>
      <h2 className="font-bold text-2xl text-zinc-100">Cars</h2>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cars.map((car: Car) => (
          <Link
            key={car.id}
            href={`/car/${car.id}`}
            className="border-zinc-800/50 bg-zinc-900/80 hover:bg-zinc-900/90 shadow-lg hover:shadow-xl backdrop-blur-sm mb-4 p-6 border rounded-lg transition-all duration-300"
          >
            <div className="relative mb-4 w-full h-48">
              {car.pictures.length > 0 && (
                <Image
                  key={car.pictures[0].id}
                  src={car.pictures[0].src}
                  alt={`${car.brand} ${car.model}`}
                  className="rounded-lg w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              )}
            </div>
            <h3 className="mb-2 font-bold text-2xl text-zinc-100">{car.brand}</h3>
            <div className="space-y-2">
              <p className="text-zinc-300">
                <span className="font-semibold">Modelo:</span> {car.model}
              </p>
              <p className="text-zinc-300">
                <span className="font-semibold">Color:</span> {car.color}
              </p>
              <p className="text-zinc-300">
                <span className="font-semibold">Pasajeros:</span> {car.passengers}
              </p>
              <p className="text-zinc-300">
                <span className="font-semibold">Aire acondicionado:</span> {car.ac ? "Sí" : "No"}
              </p>
              <p className="font-bold text-blue-400 text-xl">${car.pricePerDay}/día</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
