import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="supports-backdrop-blur:bg-background/60 fixed top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="cursor-pointer flex gap-1 items-center">
          <Image src="/pokeball.png" alt="logo" width={30} height={30} />
          <span className="hidden font-bold sm:inline-block select-none">
            Pokedex
          </span>
        </Link>
        <Link href="/my-pokemon" className="font-bold">
          My Pokemon
        </Link>
      </div>
    </header>
  );
};

export default Header;
