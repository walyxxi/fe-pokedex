"use client";

import { apiUrl } from "@/constant";
import { PokemonData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllMyPokemon = (limit: number, offset: number) => {
  return useQuery<PokemonData[]>({
    queryKey: ["myPokemon", limit, offset],
    queryFn: async () => {
      const { data } = await axios.get(
        `${apiUrl}?limit=${limit}&offset=${offset}`
      );
      return data.data;
    },
  });
};

export const catchPokemon = async () => {
  const res = await axios.get(`${apiUrl}/catch`);
  return res;
};

interface Body {
  id: Number;
  name: String;
  nickname: String;
}

export const postMyPokemon = async (body: Body) => {
  const { data } = await axios.post(`${apiUrl}`, body);
  return data;
};
