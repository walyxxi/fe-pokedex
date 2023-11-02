import React, { Suspense } from "react";

import Link from "next/link";
import { capitalize } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

type Props = {
  pokemonName: string;
  pokemonImgUrl?: string;
  pokemonId: number;
};

export default function PokemonCard({
  pokemonName,
  pokemonImgUrl,
  pokemonId,
}: Props) {
  return (
    <Link href={`/pokemon/${pokemonName}`}>
      <Card>
        <CardHeader>
          <CardTitle>{capitalize(pokemonName)}</CardTitle>
        </CardHeader>
        <CardContent className="self-center justify-center flex">
          <Suspense fallback={<div>Loading...</div>}>
            <Image
              width="0"
              height="0"
              sizes="100%"
              className="w-36 h-36 object-contain"
              src={pokemonImgUrl || ""}
              alt={`${pokemonName} image`}
              loading="eager"
            />
          </Suspense>
        </CardContent>
        <CardFooter>
          <span className="font-bold text-gray-300 text-end w-full">
            #{pokemonId}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
