type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

type TypeName =
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dark"
  | "dragon"
  | "steel"
  | "fairy";

interface Stat {
  name: StatName;
  url: string;
}

interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: Stat;
}

interface Ability {
  name: string;
  url: string;
}

interface PokemonAbility {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

interface species {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: TypeName;
    url: string;
  };
}

export interface PokemonData {
  id: number;
  name: string;
  stats: PokemonStats[];
  abilities: PokemonAbility[];
  types: PokemonType[];
  weight: number;
  height: number;
  species: species;
}
