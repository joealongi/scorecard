import Link from "next/link";

import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mb-16">
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
          <Link rel="noopener noreferrer" target="_self" href="/">
            Leaderboard
          </Link>
        </li>
        <li className="flex items-center self-center justify-self-end ml-auto transition-all">
          <Link
            className="button py-3 px-3 md:px-9"
            rel="noopener noreferrer"
            target="_self"
            href="/"
          >
            Download
          </Link>
        </li>
      </ul>
    </footer>
  );
}
