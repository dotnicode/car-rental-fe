"use client";

import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(8, { message: "Al menos 8 caracteres" }),
});

export type SigninSchemaType = z.infer<typeof signinSchema>;
