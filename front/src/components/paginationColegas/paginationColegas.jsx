import React from "react";

function PaginationColegas(){
return(
<nav>
  <ul className="flex">
    <li>
      <a
        className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
        href="#"
        aria-label="Previous"
      >
        <span className="material-icons text-sm">keyboard_arrow_left</span>
      </a>
    </li>
    <li>
      <a
        className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out"
        href="#"
      >
        1
      </a>
    </li>
    <li>
      <a
        className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
        href="#"
      >
        2
      </a>
    </li>
    <li>
      <a
        className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
        href="#"
      >
        3
      </a>
    </li>
    <li>
      <a
        className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
        href="#"
        aria-label="Next"
      >
        <span className="material-icons text-sm">keyboard_arrow_right</span>
      </a>
    </li>
  </ul>
</nav>
);
}
export default PaginationColegas;
