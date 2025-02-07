import { Car } from "@/features/car/types/car.type";
import CarGrid from "@/features/car/components/car-grid";

const getCars = async (): Promise<Car[]> => {
  const res = await fetch("http://localhost:4000/api/car");
  const data = await res.json();
  return data;
};

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Elegidos para ti
      </h2>

      <CarGrid cars={cars} />
    </div>
  );
}
