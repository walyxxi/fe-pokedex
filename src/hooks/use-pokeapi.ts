import { pokeapiUrl } from "@/constant";
import { PokemonData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllPokemonPage = (limit: number, offset: number) => {
  return useQuery<PokemonData[]>({
    queryKey: ["pokemonWithPage", limit, offset],
    queryFn: async () => {
      const { data } = await axios.get(
        `${pokeapiUrl}/?limit=${limit}&offset=${offset}`
      );
      return data.results.map((result: { name: String; url: String }) => ({
        ...result,
        id: parseInt(result.url.split("/")[6]),
      }));
    },
  });
};
