import { TypographyH1 } from "@/components/typography";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Car } from "@/features/car/types/car.type";
import Image from "next/image";
import Link from "next/link";

const getCars = async (): Promise<Car[]> => {
  const res = await fetch("http://localhost:4000/api/car");
  const data = await res.json();
  return data;
};

export default async function CarAdminPage() {
  const cars = await getCars();

  return (
    <div className="min-h-screen">
      <TypographyH1>Gestionar Vehículos</TypographyH1>

      <div className="flex justify-end items-center gap-2">
        <Link href="/admin/cars/create">
          <Button>Agregar Vehículo</Button>
        </Link>
      </div>

      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="text-right w-40">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id} className="hover:bg-gray-100">
              <TableCell className="font-medium">
                <div className="relative mx-auto w-32 aspect-video">
                  <Image
                    src={"/vehicle-placeholder.png"}
                    alt={car.brand}
                    fill
                    priority
                    className="rounded-lg object-cover"
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
                  <Button variant="outline">Editar</Button>
                  <Button variant="destructive">Eliminar</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
