import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Car } from "@/features/car/types/car.type";
import Image from "next/image";
import Link from "next/link";
import { deleteCarAction } from "./actions";

const getCars = async (): Promise<Car[]> => {
  const res = await fetch("http://localhost:4000/api/car");
  const data = await res.json();

  console.log(data);
  return data;
};

export default async function CarAdminPage() {
  const cars = await getCars();

  return (
    <div className="mx-auto max-w-6xl min-h-screen">
      <div className="flex justify-end items-center gap-2">
        <Link href="/admin/cars/create">
          <Button className="bg-purple-500 hover:bg-purple-600">Agregar Vehículo</Button>
        </Link>
      </div>

      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="w-40 text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id} className="hover:bg-purple-50">
              <TableCell className="font-medium">
                <div className="relative mx-auto w-32 aspect-video">
                  <Image
                    src={car.pictures[0] ? car.pictures[0].src : "/vehicle-placeholder.png"}
                    alt={car.brand}
                    fill
                    priority
                    className="rounded object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 33vw"
                  />
                </div>
              </TableCell>

              <TableCell>{car.brand}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>
                {Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(car.pricePerDay)}
              </TableCell>
              <TableCell>
                <div className="flex justify-end items-center gap-2 px-4 h-full min-h-[80px]">
                  <Link href={`/admin/cars/${car.id}`}>
                    <Button variant="outline">Editar</Button>
                  </Link>

                  <form action={deleteCarAction}>
                    <input type="hidden" name="id" value={car.id.toString()} />

                    <Button variant="destructive" type="submit">
                      Eliminar
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
