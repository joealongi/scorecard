import Link from "next/link";

import { Button } from "@/components/ui/button";

import Logo from "@/components/custom/Logo";

export default function Navar() {
  return (
    <nav className="mb-16">
      <ul className="flex flex-row space-x-6 md:space-x-9 space-y-0 mx-auto mt-3 font-sm">
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" href="/">
            <Logo />
          </Link>
        </li>
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" href="/">
            Home
          </Link>
        </li>
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" href="/">
            About
          </Link>
        </li>
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" href="/leaderboard">
            Leaderboard
          </Link>
        </li>
        <li className="flex items-center self-center justify-self-end ml-auto transition-all">
          <Button className="button py-3 px-3 md:px-9" variant="outline">
            Download
          </Button>
        </li>
      </ul>
    </nav>
  );
}
