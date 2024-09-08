import React from 'react';
export default function Home() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gradient-to-tr to-blue-900 from-white">
        <div className="w-max text-center">
          <h1 className="overflow-hidden whitespace-nowrap pr-5 text-5xl text-gray-900 font-bold tracking-tight">
            Skill Mosaic
          </h1>
          <div className="relative">
            <h1 className="absolute top-5 left-1/2 transform -translate-x-1/2 overflow-hidden border-r-4 border-r-white text-xl text-white font-bold animate-typing whitespace-nowrap w-[200px]">
              Ready to UpSkill&UpGrade?
            </h1><br />
          </div>
        </div>
      </div>
    </>
  );
}
