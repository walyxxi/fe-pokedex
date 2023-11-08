import React, { Suspense, useState } from "react";

import Loading from "@/components/loading";
import { capitalize } from "@/lib/utils";
import { PokemonData } from "@/types";
import { AlertCircleIcon, Magnet } from "lucide-react";
import Image from "next/image";
import { Badge } from "../badge";
import { Separator } from "../separator";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { catchPokemon, postMyPokemon } from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Dialog from "../dialog";

type Props = {
  pokemonData: PokemonData;
  pokemonImageURL: string;
};

const PokemonDetails = ({ pokemonData, pokemonImageURL }: Props) => {
  const route = useRouter();
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [isCatching, setIsCatching] = useState(false);
  const [isSuccessCatching, setIsSuccessCatching] = useState(false);
  const [isUnsuccessCatching, setIsUnsuccessCatching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { refetch, data } = useQuery({
    queryKey: ["catchPokemon"],
    queryFn: catchPokemon,
    enabled: false,
    retry: 0,
  });

  const handleOnCatch = () => {
    setOpenDialog(true);
    setIsCatching(true);

    setTimeout(() => {
      refetch()
        .then((res) => {
          if (res.status === "error") {
            setIsUnsuccessCatching(true);
          } else {
            setIsSuccessCatching(true);
          }
        })
        .catch((err) => {
          if (err) {
            setIsUnsuccessCatching(true);
          }
        })
        .finally(() => {
          setIsCatching(false);
        });
    }, 2000);
  };

  const [newNickname, setNewNickname] = useState(pokemonData.name);

  const handleOnChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewNickname(e.target.value);

  const createMyPokemon = useMutation({
    mutationFn: postMyPokemon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPokemon"] });
      route.push("/mypokemon");
    },
  });

  const handleOnSave = () => {
    setIsCatching(false);
    setIsSuccessCatching(false);
    setIsSaving(true);

    setTimeout(() => {
      createMyPokemon.mutate({
        uid: pokemonData.uid || 0,
        id: pokemonData.id,
        name: pokemonData.name,
        nickname: newNickname,
      });
      setOpenDialog(false);
      setIsSaving(false);
    }, 2000);
  };

  const handleOnCloseUnsuccess = () => {
    setOpenDialog(false);
    setIsUnsuccessCatching(false);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-col gap-4 justify-between">
          <CardTitle className="flex items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {capitalize(pokemonData.name)}
              </span>
              <span className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                #{pokemonData.id ?? 0}
              </span>
            </div>
            <Button
              size={"sm"}
              className="bg-green-700"
              onClick={handleOnCatch}
            >
              <Magnet className="w-5 h-5" />
              <span className="ml-2 hidden md:block">Catch</span>
            </Button>
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
                  className="w-60 h-60 md:w-72 md:h-72 mix-blend-multiply bg-transparent my-4 object-contain"
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
      <Dialog isOpen={openDialog}>
        <>
          {isCatching && (
            <Loading text={`Catching ${capitalize(pokemonData.name)}`} />
          )}
          {isSuccessCatching && (
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col gap-1">
                  <span>Gotcha, you got new Pokemon.</span>
                  <span className="text-xs text-gray-400 font-normal">
                    Rename your Pokemon and Save it as your collection!
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Input
                  placeholder="Pokemon Name"
                  value={newNickname}
                  onChange={handleOnChangeNickname}
                />
                <Button size={"sm"} onClick={handleOnSave}>
                  Save
                </Button>
              </CardContent>
            </Card>
          )}
          {isUnsuccessCatching && (
            <Card>
              <CardHeader>
                <CardTitle className="font-normal flex items-center gap-2">
                  <AlertCircleIcon className="text-yellow-500" />
                  Opsss, you miss it,{" "}
                  <span
                    className="font-bold underline cursor-pointer text-yellow-700"
                    onClick={handleOnCloseUnsuccess}
                  >
                    try again!
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
          )}
          {isSaving && (
            <Loading
              text={`Save ${capitalize(pokemonData.name)} to My Collection`}
            />
          )}
        </>
      </Dialog>
    </>
  );
};

export default PokemonDetails;
