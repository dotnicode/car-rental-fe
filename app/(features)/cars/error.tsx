"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-xl font-semibold text-red-600 mb-2">
        ¡Ups! Algo salió mal
      </h2>

      <p className="text-gray-600">
        No pudimos cargar los coches en este momento. Por favor, intenta
        nuevamente más tarde.
      </p>

      <Button variant="outline" onClick={() => reset()} className="mt-4">
        Intentar otra vez
      </Button>
    </div>
  );
}
