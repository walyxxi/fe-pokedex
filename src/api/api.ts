import { apiUrl } from "@/constant";
import { MyPokemonData } from "@/types";
import axios from "axios";

export const getMyPokemon = async (limit: Number, offset: Number) => {
  const { data } = await axios.get(`${apiUrl}?limit=${limit}&offset=${offset}`);
  return data.data;
};

export const catchPokemon = async () => {
  const { data } = await axios.get(`${apiUrl}/catch`);
  return data;
};

export const postMyPokemon = async (body: MyPokemonData) => {
  const { data } = await axios.post(`${apiUrl}`, {
    id: body.id,
    name: body.name,
    nickname: body.nickname,
  });
  return data;
};

export const renameMyPokemon = async (body: MyPokemonData) => {
  const { data } = await axios.put(`${apiUrl}/rename/${body.uid}`, {
    id: body.id,
    name: body.name,
    nickname: body.nickname,
    count_update: body.count_update,
  });
  return data.data;
};

export const releaseMyPokemon = async (uid: Number) => {
  const { data } = await axios.delete(`${apiUrl}/release/${uid}`);
  return data.data;
};
