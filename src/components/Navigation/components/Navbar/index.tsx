import Link from "next/link";

export function Navbar() {
  return (
    <nav className="px-10 py-4 hidden border-b border-gray-300 fixed top-0 left-0 lg:flex w-full items-center justify-between">
      <Link href={"/"}>
        <h1 className="text-4xl font-bold text-emerald-500">Ambisis</h1>
      </Link>

      <ul className="flex items-center gap-6">
        <li>
          <Link
            href={"/"}
            className="hover:text-emerald-500 transition-colors duration-300"
          >
            Empresas
          </Link>
        </li>

        <li>
          <Link
            href={"/licenses"}
            className="hover:text-emerald-500 transition-colors"
          >
            Licenças ambientais
          </Link>
        </li>
      </ul>
    </nav>
  );
}
