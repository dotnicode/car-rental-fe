"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CarPicture } from "@/features/car/enums/car-picture.enum";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car } from "../types/car.type";
import Image from "next/image";

interface ImagePreview {
  file?: File;
  preview: string;
  id?: string;
  type: CarPicture;
}

const CarFormSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  pricePerDay: z.number().min(1),
  ac: z.boolean(),
  passengers: z.number().min(1),
  color: z.string().min(1),
});

type CarFormValues = z.infer<typeof CarFormSchema>;

export function CarForm({ car }: { car: Car }) {
  const router = useRouter();
  const { toast } = useToast();

  const [imagePreviews, setImagePreviews] = useState<Record<CarPicture, ImagePreview>>({
    [CarPicture.FRONT]: {
      preview: car.pictures.find((p) => p.type === CarPicture.FRONT)?.src || "",
      type: CarPicture.FRONT,
      id: car.pictures.find((p) => p.type === CarPicture.FRONT)?.id?.toString() || "",
    },
    [CarPicture.LEFT]: {
      preview: car.pictures.find((p) => p.type === CarPicture.LEFT)?.src || "",
      type: CarPicture.LEFT,
      id: car.pictures.find((p) => p.type === CarPicture.LEFT)?.id?.toString() || "",
    },
    [CarPicture.RIGHT]: {
      preview: car.pictures.find((p) => p.type === CarPicture.RIGHT)?.src || "",
      type: CarPicture.RIGHT,
      id: car.pictures.find((p) => p.type === CarPicture.RIGHT)?.id?.toString() || "",
    },
    [CarPicture.BACK]: {
      preview: car.pictures.find((p) => p.type === CarPicture.BACK)?.src || "",
      type: CarPicture.BACK,
      id: car.pictures.find((p) => p.type === CarPicture.BACK)?.id?.toString() || "",
    },
  });

  const form = useForm<CarFormValues>({
    resolver: zodResolver(CarFormSchema),
    defaultValues: {
      brand: car.brand ?? "",
      model: car.model ?? "",
      pricePerDay: car.pricePerDay ?? 0,
      ac: car.ac ?? false,
      passengers: car.passengers ?? 1,
      color: car.color ?? "",
    },
  });

  const handleImageChange = async (type: CarPicture, file: File) => {
    const preview = URL.createObjectURL(file);
    setImagePreviews((prev) => ({
      ...prev,
      [type]: { file, preview, type },
    }));
  };

  const onSubmit = async (values: CarFormValues) => {
    try {
      const pictureIds: string[] = [];

      for (const [type, preview] of Object.entries(imagePreviews)) {
        if (preview.file) {
          const formData = new FormData();
          formData.append("image", preview.file);
          formData.append("carId", String(car.id));
          formData.append("title", type.toLowerCase());
          formData.append("description", "");
          formData.append("type", type);
          formData.append("date", new Date().toISOString());

          const imageResponse = await fetch("http://localhost:4000/api/picture", {
            method: "POST",
            body: formData,
          });

          if (!imageResponse.ok) {
            throw new Error(`Error al subir la imagen ${type}`);
          }

          const imageData = await imageResponse.json();
          pictureIds.push(imageData.id);
        } else if (preview.id) {
          pictureIds.push(preview.id);
        }
      }

      const response = await fetch(`http://localhost:4000/api/car/${car.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          pictureIds,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el vehículo");
      }

      toast({
        title: "¡Vehículo actualizado!",
      });

      router.push("/admin/cars");
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error al actualizar el vehículo",
        description: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };

  useEffect(() => {
    return () => {
      Object.values(imagePreviews).forEach((preview) => {
        if (preview.preview && !preview.preview.startsWith("http")) {
          URL.revokeObjectURL(preview.preview);
        }
      });
    };
  }, []);

  const renderImageField = (type: CarPicture, label: string) => (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="flex items-center gap-4">
        {imagePreviews[type].preview ? (
          <Image
            src={imagePreviews[type].preview}
            alt={`${label} actual`}
            className="rounded-md object-cover"
            width={96}
            height={96}
          />
        ) : (
          <div className="flex justify-center items-center bg-gray-200 rounded-md w-24 h-24">
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}
        <FormControl>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageChange(type, file);
              }
            }}
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );

  return (
    <Form {...form}>
      <div className="gap-4 grid">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pricePerDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio por Día</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || !isNaN(Number(value))) {
                      field.onChange(e);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ac"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aire Acondicionado</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passengers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pasajeros</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {renderImageField(CarPicture.FRONT, "Foto delantera")}
        {renderImageField(CarPicture.LEFT, "Foto lateral izquierda")}
        {renderImageField(CarPicture.RIGHT, "Foto lateral derecha")}
        {renderImageField(CarPicture.BACK, "Foto trasera")}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-lg text-white"
          onClick={form.handleSubmit(onSubmit)}
        >
          Actualizar Vehículo
        </Button>
      </div>
    </Form>
  );
}
