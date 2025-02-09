import { cn } from "@/lib/utils";
import React from "react";

export function TypographyH1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 font-extrabold text-4xl lg:text-5xl tracking-tight",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 first:mt-0 pb-2 border-b font-semibold text-3xl tracking-tight",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "scroll-m-20 font-semibold text-2xl tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        "scroll-m-20 font-semibold text-xl tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyP({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("[&:not(:first-child)]:mt-6 leading-7", className)}>
      {children}
    </p>
  );
}

export function TypographyLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-muted-foreground text-xl", className)}>{children}</p>
  );
}

export function TypographyLarge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("font-semibold text-lg", className)}>{children}</div>
  );
}

export function TypographySmall({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <small className={cn("font-medium text-sm leading-none", className)}>
      {children}
    </small>
  );
}

export function TypographyMuted({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  );
}
