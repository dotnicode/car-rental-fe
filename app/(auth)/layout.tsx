import { ModeToggle } from "@/components/mode-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="top-4 right-4 absolute">
        <ModeToggle />
      </div>

      {children}
    </div>
  );
}
