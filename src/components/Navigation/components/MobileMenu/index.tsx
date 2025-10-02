"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="fixed right-10 top-10 border cursor-pointer border-gray-300 rounded-sm lg:hidden p-2">
        <span className="text-xl">
          <Menu />
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-gray-200 shadow-lg rounded-sm">
        <DropdownMenuItem className="hover:bg-gray-300/40" asChild>
          <Link href="/" className="block cursor-pointer px-4 py-2 text-black ">
            Empresas
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-gray-300/40" asChild>
          <Link
            href="/licenses"
            className="block px-4 py-2 text-black cursor-pointer"
          >
            Licenças ambientais
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
