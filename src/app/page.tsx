import PokemonList from "@/components/pokemon/pokemon-list";

export default function Home() {
  return (
    <main className="min-h-screen pt-10">
      <div className="container p-10">
        <PokemonList />
      </div>
    </main>
  );
}
