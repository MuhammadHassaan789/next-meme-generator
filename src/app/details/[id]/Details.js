'use client'
import Image from 'next/image';
import { useState, createRef } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';

export default function Detail({ params, singleDetail, imageUrl, width, height, ids }) {

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [generatedMemeUrl, setGeneratedMemeUrl] = useState('');

    const memeRef = createRef();

    async function generateMeme() {
        try {
            const response = await fetch(`https://api.imgflip.com/caption_image?template_id=${params.id}&username=g_user_110504828183180579662&password=Hassan786&text0=${text1}&text1=${text2}`);

            if (!response.ok) {
                throw new Error(`Failed to generate meme. Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setGeneratedMemeUrl(result.data.url);
            } else {
                console.error(`Error generating meme: ${result.error_message}`);
            }
        } catch (error) {
            console.error('Error generating meme:', error.message);
        }
    }


    return (
        <main className="flex flex-col items-center justify-between p-4 lg:p-24">
            <div className="max-w-5xl w-full mb-5">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-2 lg:dark:bg-zinc-800/30">
                    Generate your Meme
                </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-start gap-6 items-start w-full">
                <div className="lg:w-1/3">
                    <Image src={imageUrl} width={width} height={height} alt="MEME-Template" />
                </div>
                <div className="w-full lg:w-1/3 mt-4 lg:mt-0 text-black">
                    <div className="mb-4">
                        <label htmlFor="text1" className="mr-2 text-white">
                            Text 1:
                        </label>
                        <input
                            className="h-12 p-2 border border-black rounded w-full"
                            type="text"
                            id="text1"
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="text2" className="mr-2 text-white">
                            Text 2:
                        </label>
                        <input
                            className="h-12 p-2 border border-black rounded w-full"
                            type="text"
                            id="text2"
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                        />
                    </div>
                    <div className="self-end">
                        <button
                            className="px-4 py-2 mr-2 bg-slate-800 text-white rounded cursor-pointer"
                            onClick={generateMeme}
                        >
                            Generate
                        </button>
                        <button
                            className="px-4 py-2 bg-slate-800 text-white rounded cursor-pointer"
                            onClick={(e) => exportComponentAsJPEG(memeRef)}
                        >
                            Save as JPEG
                        </button>
                    </div>
                </div>
            </div>
            <div ref={memeRef} className="mt-8">
                {generatedMemeUrl && (
                    <img className="w-full max-w-md mx-auto" src={generatedMemeUrl} alt="Generated Meme" />
                )}
            </div>
        </main>
    );
}
