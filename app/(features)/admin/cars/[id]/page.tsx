import { TypographyH1 } from "@/components/typography";
import { CarForm } from "@/features/car/components/car-form";
import { Car } from "@/features/car/types/car.type";

async function getCarById(id: string): Promise<Car> {
  const car = await fetch(`http://localhost:4000/api/car/${id}`);
  return car.json();
}

export default async function EditCarPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  if (!id) {
    return <div>Error: ID no válido</div>;
  }

  const car = await getCarById(id);

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="bg-white shadow-sm mx-auto p-8 rounded-xl max-w-5xl">
        <TypographyH1 className="mb-8">Editar Vehículo</TypographyH1>
        <CarForm car={car} />
      </div>
    </div>
  );
}
