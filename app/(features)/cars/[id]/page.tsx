import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Car } from "@/features/car/types/car.type";
import { InfoIcon, ArrowUpIcon } from "lucide-react";

async function getCarById(id: string): Promise<Car> {
  const car = await fetch(`http://localhost:4000/api/car/${id}`);
  return car.json();
}

const PriceAlert = () => {
  return (
    <div className="bg-muted dark:bg-muted shadow p-6 rounded-lg">
      <div className="flex items-center gap-2 text-purple-600">
        <ArrowUpIcon className="w-5 h-5" />
        <p>Se espera que el precio suba</p>
      </div>
      <p className="mt-2 text-sm">¡Reserva ahora y ahorra!</p>
    </div>
  );
};

export default async function CarDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const car = await getCarById(params.id);

  return (
    <main className="mx-auto p-4 max-w-7xl min-h-screen">
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        {/* Columna izquierda con imagen y detalles del carro */}
        <div className="space-y-6 md:col-span-2">
          <div className="bg-white dark:bg-muted shadow p-6 rounded-lg">
            <div className="flex items-start gap-6">
              <div className="relative w-48 h-48">
                <Image
                  src={car.pictures[0]?.src || "/vehicle-placeholder.png"}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex-1">
                <h1 className="font-bold text-xl">
                  {car.brand} {car.model}
                </h1>
                <p className="text-muted-foreground text-sm">
                  o Económico similar
                </p>

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      👥 {car.passengers} pasajeros
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      ⚙️ {Math.random() > 0.5 ? "Manual" : "Automática"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🚗 Kilometraje ilimitado</span>
                  </div>
                  <div className="flex items-center gap-2 capitalize">
                    <span className="text-sm">🎨 {car.color}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="mb-2 font-semibold">Esta reserva incluye</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Protección del Vehículo
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Protección Contra Terceros
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Columna derecha con el resumen de la reserva */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-muted shadow p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Tu reserva</h2>
              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                1 tarifa diaria
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Valor del vehículo</span>
                <span>
                  {Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                    currencyDisplay: "code",
                  }).format(car.pricePerDay)}
                </span>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Plan Light</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Protección del Vehículo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Protección Contra Terceros
                  </li>
                </ul>
              </div>

              <div className="flex justify-between">
                <span>Tarifas de la compañía de alquiler</span>
                <span>US$ 6,08</span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between font-bold">
                  <span>Monto total</span>
                  <span>
                    {Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                      currencyDisplay: "code",
                    }).format(car.pricePerDay)}
                  </span>
                </div>
              </div>

              <Button className="w-full">Continuar</Button>
            </div>
          </div>

          <PriceAlert />
        </div>
      </div>
    </main>
  );
}
