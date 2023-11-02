import { PokemonData } from "@/types";
import React, { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { capitalize } from "@/lib/utils";
import { Badge } from "../badge";
import Image from "next/image";
import { Separator } from "../separator";

type Props = {
  pokemonData: PokemonData;
  pokemonImageURL: string;
};

const PokemonDetails = ({ pokemonData, pokemonImageURL }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="flex flex-col md:flex-row gap-4 flex-wrap">
          <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {capitalize(pokemonData.name)}
          </span>
          <span className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            #{pokemonData.id ?? 0}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-flow-row grid-cols-1 md:grid-flow-col md:grid-cols-3 gap-6">
        <div>
          <div className="flex gap-2">
            {pokemonData.types.map((type, index) => (
              <Badge key={index} type={`${type.type.name}`}>
                {capitalize(type.type.name)}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col items-center">
            <Suspense fallback={<div>Loading...</div>}>
              <Image
                width="0"
                height="0"
                sizes="100%"
                className="w-80 h-80 mix-blend-multiply bg-transparent my-4 object-contain"
                src={pokemonImageURL}
                alt="pokemon image"
              />
            </Suspense>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="flex h-20 items-center space-x-4 text-sm">
            <div className="flex flex-col">
              <p>Height</p>
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                {pokemonData.height} m
              </h2>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col">
              <p>Weight</p>
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                {pokemonData.weight} kg
              </h2>
            </div>
          </div>
          <div className="w-full pt-5 flex flex-col gap-2">
            {pokemonData.stats.map((stats, index) => (
              <div key={index}>
                <p className="flex justify-between">
                  <span>{capitalize(stats.stat.name)}</span>
                  <span>{stats.base_stat}</span>
                </p>
                <div className="bg-gray-200 w-full h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-black h-full"
                    style={{ width: `${stats.base_stat / 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonDetails;
