import React, { ButtonHTMLAttributes, Suspense } from "react";

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
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  pokemonName: string;
  pokemonRealName: string;
  pokemonImgUrl?: string;
  pokemonId: number;
  isCardAction?: boolean;
  onClickRename?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickRelease?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function PokemonCard({
  pokemonName,
  pokemonRealName,
  pokemonImgUrl,
  pokemonId,
  isCardAction = false,
  onClickRename,
  onClickRelease,
}: Props) {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer"
      onClick={() => router.push(`/pokemon/${pokemonRealName}`)}
    >
      <CardHeader>
        <CardTitle>
          {capitalize(pokemonName)}
          <span className="ml-2 font-bold text-gray-300 text-end">
            #{pokemonId}
          </span>
        </CardTitle>
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
          />
        </Suspense>
      </CardContent>
      {isCardAction && (
        <CardFooter className="flex justify-end">
          <div className="flex gap-2">
            <Button
              className="bg-green-700"
              size={"xs"}
              onClick={onClickRename}
            >
              Rename
            </Button>
            <Button className="bg-red-700" size={"xs"} onClick={onClickRelease}>
              Release
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
