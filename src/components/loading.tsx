import Image from "next/image";

interface Props {
  text?: String;
}

export default function loading({ text = "Loading" }: Props) {
  return (
    <div className="w-full h-full grow flex pt-14 justify-center items-center">
      <div className="animate-bounce flex flex-row items-center gap-2">
        <Image src="/pokeball.png" alt="logo" width={30} height={30} />
        <h1>{text}</h1>
      </div>
    </div>
  );
}
