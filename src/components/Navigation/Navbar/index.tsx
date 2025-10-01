import Link from "next/link";

export function Navbar() {
  return (
    <nav className="px-14 py-4 border-b border-gray-300 fixed top-0 left-0 flex w-full items-center justify-between">
      <h1 className="text-3xl font-bold text-emerald-500">Ambisis</h1>

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
