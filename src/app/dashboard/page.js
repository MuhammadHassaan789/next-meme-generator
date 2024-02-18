import Image from "next/image";
import Link from "next/link";

export default async function Dashboard() {

    const res = await fetch('https://api.imgflip.com/get_memes')
    const result = await res.json()

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Generate your Memes
                </p>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left object-cover w-48 h-48">
                {result.data.memes.map((item, index) => {
                    return <Link
                        key={index}
                        href={`/details/${item.id}`}
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        rel="noopener noreferrer"
                    >
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            {item.name}
                        </h2>
                        <Image className="w-40 h-40 object-cover"
                            src={item.url} width="250" height="400" />
                    </Link>
                })}
            </div>
        </main>
    );
}
