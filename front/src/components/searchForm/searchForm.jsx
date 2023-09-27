import { useAuthContext } from "@/context/authContext";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; 

function SearchForm() {
  const [motivo, setMotivo] = useState("");
  const [demandas, setDemandas] = useState([]);
  const [loader, setLoader] = useState(true);

  const handleChange = (e) => setMotivo(e.target.value);

  useEffect(() => {
    setLoader(true);
    const controller = new AbortController();
    const signal = controller.signal;

    if (motivo !== "") {
      setTimeout(() => {
        fetch("http://localhost/devtic/api/ObtenerDemandasPorMotivo.php", {
          signal: signal,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ motivoDemanda: motivo }),
        })
          .then((response) => {
            if (response.status === 404) {
              setLoader(false);
            }
            if (!response.ok) {
              throw new Error("La solicitud no se completó correctamente");
            }

            return response.json();
          })
          .then((data) => {
            setDemandas(data ?? []);
          })
          .catch((error) => {
            setDemandas([]);
          });
      }, 500);
    } else {
      setDemandas([]);
    }

    return () => {
      controller.abort();
    };
  }, [motivo]);

  return (
    <>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar motivos"
          autoComplete="off"
          onChange={handleChange}
        />
      </div>
      {demandas.length > 0 ? (
        <div className="z-10 absolute bg-white divide-y divide-gray-700 rounded-lg shadow-xl dark:bg-gray-700">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {demandas.map((demanda) => (
              <li key={demanda.idDemanda}>
                <Link
                  href={`demandas/${demanda.idDemanda}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <div className="mb-1 font-medium">{demanda.motivoDemanda}</div>
                  <div className="text-sm text-gray-500">
                    Creado por: {demanda.nombrePersona}
                  </div>
                  <div className="text-sm text-gray-500">
                    Fecha de Creación: {demanda.fechaIngresoDemanda}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : motivo !== "" && !loader ? (
        <div className="z-10 absolute bg-white divide-y divide-gray-700 rounded-lg shadow-xl dark:bg-gray-700">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <div className="block px-4 py-2 hover-bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                No se encuentran coincidencias
              </div>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default SearchForm;
