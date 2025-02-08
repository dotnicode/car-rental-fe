import { Car } from "@/features/car/types/car.type";
import CarGrid from "@/features/car/components/car-grid";

const getCars = async (): Promise<Car[]> => {
  const res = await fetch("http://localhost:4000/api/car");
  const data = await res.json();
  return data;
};

export default async function CarsPage() {
  let cars: Car[] = [];

  cars = await getCars();
  try {
  } catch (error) {
    console.error("Error al cargar los coches:", error);
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          ¡Ups! Algo salió mal
        </h2>
        <p className="text-gray-600">
          No pudimos cargar los coches en este momento. Por favor, intenta
          nuevamente más tarde.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Elegidos para ti
      </h2>

      <CarGrid cars={cars} />
    </div>
  );
}
