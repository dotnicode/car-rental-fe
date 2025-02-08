import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { NavigationMenu } from "../navigation-menu";
import { Icons } from "../icons";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div className="md:flex justify-between items-center hidden mb-10 py-4">
      <Link href="/">
        <span className="flex items-center gap-2 font-bold text-xl">
          <span>CarRental</span>
        </span>
      </Link>

      <NavigationMenu />

      <div className="flex items-center gap-5">
        <Button variant="secondary">
          <Icons.User className="w-4 h-4" /> Username
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
