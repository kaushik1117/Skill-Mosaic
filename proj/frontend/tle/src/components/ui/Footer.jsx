import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <Link to="" className="hover:underline">SkillMosaic™</Link>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li className="mr-4 md:mr-6">
            <Link to="" className="hover:underline">About</Link>
          </li>
          <li className="mr-4 md:mr-6">
            <Link to="" className="hover:underline">Privacy Policy</Link>
          </li>
          <li className="mr-4 md:mr-6">
            <Link to="" className="hover:underline">Licensing</Link>
          </li>
          <li>
            <Link to="" className="hover:underline">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
