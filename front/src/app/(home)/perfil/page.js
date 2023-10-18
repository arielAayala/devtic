import React from "react";

function Perfil() {
	return (
		<>
		<div className="bg-gray-100">
    <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex flex-col items-center">
                        <img src="https://randomuser.me/api/portraits/men/94.jpg" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">

                        </img>
                        <h1 className="text-xl font-bold">Nombre</h1>
                        <p className="text-gray-600">Especialidad</p>
                        <div className="mt-6 flex flex-wrap gap-4 justify-center">
                            <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contacto</a>
                            <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Editar</a>
                        </div>
                    </div>
                    <hr className="my-6 border-t border-gray-300"/>
                    <div className="flex flex-col">
                    </div>
                </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Demandas</h2>
<div className="bg-white">
  <div className="max-w-xl mx-auto p-8">
    <div className="flow-root">
      <ul className="-mb-8">

        <li>
          <div className="relative pb-8">
            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
            <div className="relative flex items-start space-x-3">
              <div>
                <div className="relative px-1">
                  <div className="h-8 w-8 bg-blue-500 rounded-full ring-8 ring-white flex items-center justify-center">
                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-1 py-0">
                <div className="text-md text-gray-500">
                  <div>
                    <a href="#" className="font-medium text-gray-900 mr-2">v3.2.0</a>

                    <a href="#"
                      className="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                      <div className="absolute flex-shrink-0 flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
                      </div>
                      <div className="ml-3.5 font-medium text-gray-900">Feature</div>
                    </a>
                  </div>
                  <span className="whitespace-nowrap text-sm">10h ago</span>
                </div>
                <div className="mt-2 text-gray-700">
                  <p>
                    - Added a user profile page for personalized settings.
                    <br></br>
                    - Implemented a dark mode for improved user experience at night.
                    <br></br>
                    - Introduced real-time notifications for instant updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="relative pb-8">
            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
            <div className="relative flex items-start space-x-3">
              <div>
                <div className="relative px-1">
                  <div className="h-8 w-8 bg-blue-500 rounded-full ring-8 ring-white flex items-center justify-center">
                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-1 py-0">
                <div className="text-md text-gray-500">
                  <div>
                    <a href="#" className="font-medium text-gray-900 mr-2">v3.1.0</a>

                    <a href="#"
                      className="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                      <div className="absolute flex-shrink-0 flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
                      </div>
                      <div className="ml-3.5 font-medium text-gray-900">Feature</div>
                    </a>
                  </div>
                  <span className="whitespace-nowrap text-sm">9h ago</span>
                </div>
                <div className="mt-2 text-gray-700">
                  <p>
                    - Improved performance by optimizing database queries.
                    <br></br>
                    - Enhanced security measures to protect user data.
                    <br></br>
                    - Streamlined the user interface for a more intuitive experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li>
          <div className="relative pb-8">
            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
            <div className="relative flex items-start space-x-3">
              <div>
                <div className="relative px-1">
                  <div className="h-8 w-8 bg-blue-500 rounded-full ring-8 ring-white flex items-center justify-center">
                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-1 py-0">
                <div className="text-md text-gray-500">
                  <div>
                    <a href="#" className="font-medium text-gray-900 mr-2">v3.0.10</a>

                    <a href="#"
                      className="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                      <div className="absolute flex-shrink-0 flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true"></span>
                      </div>
                      <div className="ml-3.5 font-medium text-gray-900">Bug</div>
                    </a>
                  </div>
                  <span className="whitespace-nowrap text-sm">6h ago</span>
                </div>
                <div className="mt-2 text-gray-700">
                  <p>
                    - Resolved a critical issue causing crashes on certain devices.
                    <br></br>
                    - Fixed a login error that prevented some users from accessing their accounts.
                    <br></br>
                    - Addressed a display glitch causing text overflow in long messages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
		</>
	)
}

export default Perfil;
