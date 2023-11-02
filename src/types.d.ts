interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: Stat;
}

interface PokemonAbility {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
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
