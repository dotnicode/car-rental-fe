"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu as NavigationMenuComponent,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const rentingOptions: { title: string; href: string; description: string }[] = [
  {
    title: "Reserva Inmediata",
    href: "/cars/reserve",
    description:
      "Reserva tu vehículo de forma rápida y sencilla para las fechas que necesites.",
  },
  {
    title: "Catálogo de Vehículos",
    href: "/cars/catalog",
    description:
      "Explora nuestra amplia gama de vehículos disponibles para renta.",
  },
  {
    title: "Ofertas Especiales",
    href: "/cars/offers",
    description:
      "Descubre nuestras promociones y descuentos especiales en renta de vehículos.",
  },
  {
    title: "Requisitos de Renta",
    href: "/cars/requirements",
    description:
      "Información sobre los documentos y requisitos necesarios para rentar un vehículo.",
  },
  {
    title: "Seguros y Coberturas",
    href: "/cars/insurance",
    description:
      "Conoce nuestras opciones de seguros y coberturas disponibles para tu tranquilidad.",
  },
  {
    title: "Servicios Adicionales",
    href: "/cars/services",
    description:
      "GPS, sillas para bebé, conductor adicional y otros servicios complementarios.",
  },
];

export function NavigationMenu() {
  return (
    <NavigationMenuComponent>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Inicio</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 grid lg:grid-cols-[.75fr_1fr] p-4 md:w-[400px] lg:w-[500px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="relative flex flex-col justify-end bg-[url('/car-banner.jpg')] bg-cover bg-center p-6 rounded-md w-full h-full no-underline overflow-hidden select-none isolate outline-none"
                    href="/"
                  >
                    <div className="-z-10 absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                    <div className="mt-4 mb-2 font-medium text-lg text-white">
                      Car Rent
                    </div>
                    <p className="text-gray-100 text-sm leading-tight">
                      Tu mejor opción para rentar vehículos de forma segura y
                      confiable.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/cars" title="Renta un Auto">
                Encuentra el vehículo perfecto para tus necesidades.
              </ListItem>
              <ListItem href="/cars/locations" title="Ubicaciones">
                Encuentra nuestras sucursales y puntos de entrega.
              </ListItem>
              <ListItem href="/cars/about" title="Sobre Nosotros">
                Conoce nuestra historia y compromiso con el servicio.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Servicios de Renta</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 grid md:grid-cols-2 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
              {rentingOptions.map((option) => (
                <ListItem
                  key={option.title}
                  title={option.title}
                  href={option.href}
                >
                  {option.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/car/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contacto
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuComponent>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="font-medium text-sm leading-none">{title}</div>
          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
