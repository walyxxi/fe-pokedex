"use client";

import { getMyPokemon, releaseMyPokemon, renameMyPokemon } from "@/api/api";
import Dialog from "@/components/dialog";
import Loading from "@/components/loading";
import PokemonCard from "@/components/pokemon/pokemon-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getImageURL } from "@/lib/utils";
import { usePaginationMyPokemonStore } from "@/store";
import { MyPokemonData, PokemonData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircleIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const MyPokemonPage = () => {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [isUnsuccessRename, setIsUnsuccessRename] = useState(false);
  const [isUnsuccessRelease, setIsUnsuccessRelease] = useState(false);

  const { currentPage, itemsPerPage, updatePagePosition } =
    usePaginationMyPokemonStore();

  const { isLoading, data, error } = useQuery<MyPokemonData[]>({
    queryKey: ["myPokemon", itemsPerPage, currentPage],
    queryFn: () => getMyPokemon(itemsPerPage, currentPage),
  });

  const updateMyPokemon = useMutation({
    mutationFn: renameMyPokemon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPokemon"] });
    },
    onError: () => {
      setOpenDialog(true);
      setIsUnsuccessRename(true);
    },
  });

  const handleRenamePokemon = (data: MyPokemonData) => {
    updateMyPokemon.mutate({ ...data });
  };

  const deleteMyPokemon = useMutation({
    mutationFn: releaseMyPokemon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPokemon"] });
    },
    onError: () => {
      setOpenDialog(true);
      setIsUnsuccessRelease(true);
    },
  });

  const handleOnCloseUnsuccess = () => {
    setOpenDialog(false);
    setIsUnsuccessRename(false);
    setIsUnsuccessRelease(false);
  };

  const handleReleasePokemon = (uid: Number) => {
    deleteMyPokemon.mutate(uid);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
      {data &&
        data.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemonName={pokemon.nickname || ""}
            pokemonRealName={pokemon.name}
            pokemonImgUrl={getImageURL(pokemon.id)}
            pokemonId={pokemon.id}
            isCardAction
            onClickRename={(e) => {
              e.stopPropagation();
              handleRenamePokemon(pokemon);
            }}
            onClickRelease={(e) => {
              e.stopPropagation();
              handleReleasePokemon(pokemon.uid);
            }}
          />
        ))}

      <Dialog isOpen={openDialog}>
        <Card>
          <CardHeader>
            <CardTitle className="font-normal flex items-center gap-2">
              <AlertCircleIcon className="text-yellow-500" />
              {isUnsuccessRelease && <span>Opsss, unsuccess release,</span>}
              {isUnsuccessRename && <span>Opsss, unsuccess rename,</span>}
              <span
                className="font-bold underline cursor-pointer text-yellow-700"
                onClick={handleOnCloseUnsuccess}
              >
                try again!
              </span>
            </CardTitle>
          </CardHeader>
        </Card>
      </Dialog>

      <div className="fixed bottom-0 flex flex-row gap-2 md:bottom-[-10] right-4 mb-4 mr-4">
        <Button
          disabled={currentPage === 0}
          onClick={() => updatePagePosition(-itemsPerPage)}
        >
          <ChevronLeft />
        </Button>
        <Button onClick={(e) => updatePagePosition(itemsPerPage)}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default MyPokemonPage;
