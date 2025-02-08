import Image from "next/image";

import { Car } from "@/features/car/types/car.type";

async function getCarById(id: string): Promise<Car> {
  const car = await fetch(`http://localhost:4000/api/car/${id}`);
  return car.json();
}

export default async function CarDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const car = await getCarById(params.id);

  return (
    <div className="mx-auto p-6 max-w-7xl">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="relative h-[400px] lg:h-[500px]">
            {car.pictures[0] && (
              <Image
                src={car.pictures[0].src}
                alt={`${car.brand} ${car.model}`}
                fill
                className="transition-transform duration-300 hover:scale-105 object-contain"
                priority
              />
            )}
          </div>

          <div className="gap-4 grid grid-cols-3">
            {car.pictures.slice(1, 4).map((picture) => (
              <div key={picture.id} className="relative h-32">
                <Image
                  src={picture.src}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Información del auto */}
        <div className="p-8">
          <h1 className="mb-6 font-bold text-4xl text-gray-800">
            {car.brand} <span className="text-blue-600">{car.model}</span>
          </h1>

          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="flex items-center text-gray-700 text-lg">
                  <span className="w-40 font-medium">Color:</span>
                  <span className="text-gray-600">{car.color}</span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="flex items-center text-gray-700 text-lg">
                  <span className="w-40 font-medium">Pasajeros:</span>
                  <span className="text-gray-600">{car.passengers}</span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="flex items-center text-gray-700 text-lg">
                  <span className="w-40 font-medium">Aire acondicionado:</span>
                  <span className="text-gray-600">{car.ac ? "Sí" : "No"}</span>
                </p>
              </div>
            </div>

            <div className="lg:pl-8 lg:border-l">
              <div className="bg-blue-50 p-6 rounded-xl">
                <p className="mb-2 font-bold text-3xl text-blue-600">
                  ${car.pricePerDay}
                </p>
                <p className="text-gray-500">por día</p>
                <button className="bg-blue-600 hover:bg-blue-700 mt-4 px-6 py-3 rounded-lg w-full font-medium text-white transition-colors">
                  Reservar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
