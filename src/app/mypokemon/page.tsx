"use client";

import { useGetAllMyPokemon } from "@/hooks/use-api";
import { usePaginationMyPokemonStore } from "@/store";
import { PokemonData } from "@/types";
import React, { useEffect, useState } from "react";
import Loading from "@/components/loading";
import PokemonCard from "@/components/pokemon/pokemon-card";
import { getImageURL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MyPokemonPage = () => {
  const { currentPage, itemsPerPage, updatePagePosition } =
    usePaginationMyPokemonStore();

  const {
    isLoading,
    data: myPokemonPage,
    error,
  } = useGetAllMyPokemon(itemsPerPage, currentPage);

  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);

  useEffect(() => {
    setPokemonList(myPokemonPage ?? []);
  }, [myPokemonPage]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
      {pokemonList.map((pokemon, index) => (
        <PokemonCard
          key={index}
          pokemonName={pokemon.nickname || ""}
          pokemonRealName={pokemon.name}
          pokemonImgUrl={getImageURL(pokemon.id)}
          pokemonId={pokemon.id}
        />
      ))}

      <div className="fixed bottom-0 flex flex-row gap-2 md:bottom-[-10] right-4 mb-4 mr-4">
        <Button
          disabled={currentPage === 0}
          onClick={() => updatePagePosition(-itemsPerPage)}
        >
          <ChevronLeft />
        </Button>
        <Button onClick={() => updatePagePosition(itemsPerPage)}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default MyPokemonPage;
