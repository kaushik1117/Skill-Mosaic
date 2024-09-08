import React from 'react';

export default function MainText(props) {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr to-blue-900 from-white p-10">
        <div className="w-max text-center">
          <h1 className="overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-sans">
            Skill Mosaic
          </h1>
          <div className="relative">
            <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 overflow-hidden border-r-4 border-r-white text-1xl text-white font-sans animate-typing whitespace-nowrap w-[200px]">
              Ready to Upskill?
            </h1><br />
            <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
    {props.name}
</button>
          </div>
        </div>
      </div>
    </>
  );
}
