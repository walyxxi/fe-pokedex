import Image from "next/image";

export default function loading() {
  return (
    <div className="w-full h-full grow flex pt-14 justify-center items-center">
      <div className="animate-bounce flex flex-row items-center gap-2">
        <Image src="/pokeball.png" alt="logo" width={30} height={30} />
        <h1>Loading</h1>
      </div>
    </div>
  );
}
