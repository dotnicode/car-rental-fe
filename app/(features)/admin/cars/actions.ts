"use server";

import { Car } from "@/features/car/types/car.type";
import { toast } from "@/hooks/use-toast";
import { revalidatePath } from "next/cache";

type CreateCarData = Pick<
  Car,
  "brand" | "model" | "pricePerDay" | "ac" | "passengers" | "color"
>;

export async function createCarAction(carData: CreateCarData) {
  try {
    const response = await fetch("http://localhost:4000/api/car", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    revalidatePath("/admin/cars");
    return { success: true, data };
  } catch (error) {
    console.error("Error creating car:", error);
    return { success: false, error: "Error al crear el vehículo" };
  }
}

export async function uploadCarImageAction(formData: FormData) {
  try {
    const response = await fetch("http://localhost:4000/api/picture", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Error response:", errorData);
      throw new Error(`Error al subir la imagen`);
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: "Error al subir la imagen" };
  }
}

export async function deleteCarAction(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    const response = await fetch(`http://localhost:4000/api/car/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidatePath("/admin/cars");
  } catch (error) {
    console.error("Error deleting car:", error);
  }
}
