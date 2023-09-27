import React from 'react';

function PopUpDemanda() {

    return (
        <div>
              <div className="relative p-4 bg-white rounded-lg dark:bg-gray-800 md:p-8">
                <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    Guardar Demanda
                </h3>
                <p className="text-sm text-gray-900 dark:text-white">
                    ¿Estás seguro de que deseas guardar esta demanda?
                </p>
                </div>
                
                    <button 
                    type="button" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
                    >
                    Confirmar
                    </button>
              </div>
        </div>
      );
    }
    
    export default PopUpDemanda;
  
