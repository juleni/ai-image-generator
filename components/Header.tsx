import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md ">
      {/** Left header part */}
      <div className="flex space-x-2 items-center">
        <Image src="openai-icon.svg" alt="Logo" height={30} width={30} />
        <div>
          <h1 className="font-bold">
            <span className="text-violet-500">AI</span> Image Generator
          </h1>
          <h2 className="text-xs">Powered by DALL-E 2, Chat GPT & MS Azure</h2>
        </div>
      </div>

      {/** Right header part */}
      <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
        <Link
          href="https://github.com/juleni"
          target={"_blank"}
          rel="noreferrer"
          className="px-2 font-light text-right"
        >
          See my GitHub page
        </Link>
        <Link
          href="https://juleni.github.io/portfolio/"
          target={"_blank"}
          rel="noreferrer"
          className="px-2 font-light"
        >
          Portfolio
        </Link>
      </div>
    </header>
  );
}

export default Header;
