import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <div className="flex justify-end py-4">
      <ModeToggle />
    </div>
  );
}
