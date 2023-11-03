"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="supports-backdrop-blur:bg-background/60 fixed top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="cursor-pointer flex gap-1 items-center">
          <Image src="/pokeball.png" alt="logo" width={30} height={30} />
          <span className="hidden font-bold sm:inline-block select-none">
            Pokedex
          </span>
        </Link>
        <div className="flex gap-4">
          <Link
            href="/"
            className={clsx(
              pathname === "/"
                ? "border-b-2 border-black font-bold"
                : "font-normal"
            )}
          >
            Home
          </Link>
          <Link
            href="/mypokemon"
            className={clsx(
              pathname === "/mypokemon"
                ? "border-b-2 border-black font-bold"
                : "font-normal"
            )}
          >
            My Pokemon
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
