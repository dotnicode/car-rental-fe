"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  signinSchema,
  SigninSchemaType,
} from "@/features/user/schemas/signin.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { envs } from "@/config/envs";
import { useToast } from "@/hooks/use-toast";
import { redirect, useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SigninSchemaType): Promise<void> => {
    const { email, password } = values;

    try {
      const response = await fetch(`${envs.BASE_URL}/user/signin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      const { accessToken, refreshToken } = data.cognitoResponse;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      router.push(`/home`);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid md:grid-cols-2 p-0">
          <Form {...form}>
            <form
              className="p-6 md:p-8 min-w-[400px]"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="font-bold text-2xl">¡Hola de nuevo 👋🏻!</h1>
                  <p className="text-balance text-muted-foreground text-sm">
                    Inicia sesión en tu cuenta de ScaleMote
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-end justify-between h-4">
                        Email
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="micorreo@ejemplo.com"
                          required
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-end justify-between h-4">
                        Contraseña
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="********"
                          required
                          {...field}
                        />
                      </FormControl>

                      <Link
                        href="#"
                        className="ml-auto text-gray-500 text-xs underline-offset-2 hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </FormItem>
                  )}
                ></FormField>

                <Button type="submit" className="w-full">
                  Iniciar sesión
                </Button>

                <div className="text-center text-sm">
                  No tienes una cuenta?{" "}
                  <Link href="/signup" className="underline underline-offset-4">
                    Regístrate
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="md:block relative hidden bg-muted">
            <video
              autoPlay
              muted
              loop
              className="dark:brightness-[0.2] absolute inset-0 w-full h-full object-cover dark:grayscale select-none"
            >
              <source src="/car-driver.webm" type="video/webm" />
            </video>
          </div>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-muted-foreground text-xs hover:[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4">
        Al continuar, aceptas nuestros{" "}
        <Link href="#">Términos de Servicio</Link> y{" "}
        <Link href="#">Política de Privacidad</Link>.
      </div>
    </div>
  );
}
