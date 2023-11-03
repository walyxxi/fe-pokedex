"use client";

import PokemonDetails from "@/components/pokemon/pokemon-details";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "@/components/loading";
import { useGetPokemon } from "@/hooks/use-pokeapi";
import { getImageURL } from "@/lib/utils";

export default function PokemonPage({ params }: { params: { slug: string } }) {
  const { data, isLoading, isError } = useGetPokemon(params.slug);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>No Data Found</div>;
  }

  return (
    <>
      {data && (
        <PokemonDetails
          pokemonData={data}
          pokemonImageURL={getImageURL(data.id)}
        />
      )}
      <div className="fixed bottom-0 flex flex-row gap-2 md:bottom-[-10] right-4 mb-4 mr-4">
        <Link href="/">
          <Button size={"lg"}>Back</Button>
        </Link>
      </div>
    </>
  );
}
