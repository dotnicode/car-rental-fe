"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { TypographyH1 } from "@/components/typography";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CarPicture } from "@/features/car/enums/car-picture.enum";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { createCar, uploadCarImage } from "../actions";
import { useRouter } from "next/navigation";

const CarFormSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  pricePerDay: z.number().min(1),
  ac: z.boolean(),
  passengers: z.number().min(1),
  color: z.string().min(1),
  frontPicture: z.instanceof(File).optional(),
  leftSidePicture: z.instanceof(File).optional(),
  rightSidePicture: z.instanceof(File).optional(),
  backPicture: z.instanceof(File).optional(),
});

export default function CreateCarPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CarFormSchema>>({
    resolver: zodResolver(CarFormSchema),
    defaultValues: {
      brand: "",
      model: "",
      pricePerDay: 0,
      ac: false,
      passengers: 1,
      color: "",
      frontPicture: undefined,
      leftSidePicture: undefined,
      rightSidePicture: undefined,
      backPicture: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof CarFormSchema>) => {
    try {
      const carResult = await createCar({
        brand: values.brand,
        model: values.model,
        pricePerDay: values.pricePerDay,
        ac: values.ac,
        passengers: values.passengers,
        color: values.color,
      });

      if (!carResult.success) {
        throw new Error(carResult.error);
      }

      const carId = carResult.data.id;

      const images = [
        { file: values.frontPicture, type: CarPicture.FRONT, title: "front" },
        { file: values.leftSidePicture, type: CarPicture.LEFT, title: "left" },
        {
          file: values.rightSidePicture,
          type: CarPicture.RIGHT,
          title: "right",
        },
        { file: values.backPicture, type: CarPicture.BACK, title: "back" },
      ];

      for (const { file, type, title } of images) {
        if (file) {
          const formData = new FormData();
          formData.append("image", file);
          formData.append("carId", carId);
          formData.append("title", title);
          formData.append("description", "");
          formData.append("type", type);
          formData.append("date", new Date().toISOString());

          const imageResult = await uploadCarImage(formData);
          if (!imageResult.success) {
            throw new Error(imageResult.error);
          }
        }
      }

      toast({
        title: "¡Vehículo añadido!",
      });

      router.push("/admin/cars");
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error al añadir el vehículo",
      });
    }
  };

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="bg-white shadow-sm mx-auto p-8 rounded-xl max-w-5xl">
        <TypographyH1 className="mb-8">Crear Vehículo</TypographyH1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="gap-8 grid grid-cols-2">
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Marca</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
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
                      <FormLabel className="text-gray-700">Modelo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
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
                      <FormLabel className="text-gray-700">
                        Precio por día
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
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
                      <FormLabel className="text-gray-700">Pasajeros</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={field.value.toString()}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Cantidad de pasajeros" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                          </SelectContent>
                        </Select>
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
                      <FormLabel className="text-gray-700">Color</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500"
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
                    <FormItem className="flex justify-between items-center space-y-0 p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <FormLabel className="text-gray-700">
                          Aire acondicionado
                        </FormLabel>
                        <p className="text-gray-500 text-sm">
                          El vehículo cuenta con aire acondicionado
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-2 border-gray-200 bg-gray-50 p-12 border-dashed rounded-lg text-center transition-colors">
                <div className="space-y-6">
                  <FormLabel className="flex items-center gap-2 text-gray-700">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Imágenes
                  </FormLabel>

                  <FormField
                    control={form.control}
                    name="frontPicture"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem className="flex items-center gap-4">
                        <FormLabel className="w-20 text-left">
                          Frontal
                        </FormLabel>
                        <FormControl>
                          <div
                            className={`relative border-2 rounded-lg ${
                              value ? "border-green-500" : "border-transparent"
                            }`}
                          >
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onChange(file);
                              }}
                              className={
                                value ? "border-none focus:ring-0" : ""
                              }
                            />
                            {value && (
                              <svg
                                className="top-1/2 right-2 absolute w-5 h-5 text-green-500 transform -translate-y-1/2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="leftSidePicture"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem className="flex items-center gap-4">
                        <FormLabel className="w-20 text-left">
                          Lateral Izquierdo
                        </FormLabel>
                        <FormControl>
                          <div
                            className={`relative ${
                              value
                                ? "border-green-500 border-2 rounded-lg"
                                : ""
                            }`}
                          >
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onChange(file);
                              }}
                              className={
                                value ? "border-none focus:ring-0" : ""
                              }
                            />
                            {value && (
                              <svg
                                className="top-1/2 right-2 absolute w-5 h-5 text-green-500 transform -translate-y-1/2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rightSidePicture"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem className="flex items-center gap-4">
                        <FormLabel className="w-20 text-left">
                          Lateral Derecho
                        </FormLabel>
                        <FormControl>
                          <div
                            className={`relative ${
                              value
                                ? "border-green-500 border-2 rounded-lg"
                                : ""
                            }`}
                          >
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onChange(file);
                              }}
                              className={
                                value ? "border-none focus:ring-0" : ""
                              }
                            />
                            {value && (
                              <svg
                                className="top-1/2 right-2 absolute w-5 h-5 text-green-500 transform -translate-y-1/2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="backPicture"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem className="flex items-center gap-4">
                        <FormLabel className="w-20 text-left">
                          Trasera
                        </FormLabel>
                        <FormControl>
                          <div
                            className={`relative ${
                              value
                                ? "border-green-500 border-2 rounded-lg"
                                : ""
                            }`}
                          >
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onChange(file);
                              }}
                              className={
                                value ? "border-none focus:ring-0" : ""
                              }
                            />
                            {value && (
                              <svg
                                className="top-1/2 right-2 absolute w-5 h-5 text-green-500 transform -translate-y-1/2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-lg text-white"
              >
                Agregar Vehículo
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
