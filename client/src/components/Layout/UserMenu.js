import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-800 w-52">
      <nav className="mt-2 flex-grow">
        <ul className="flex flex-col py-4 space-y-4">
          <li>
            <NavLink
              to={"/dashboard/user/profile"}
              className="flex items-center px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current"
                  d="M5 3h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm14 8V5H5v6h14zM5 19h14a2 2 0 0 1 2 2v-6a2 2 0 0 1-2-2H5a2 2 0 0 1-2 2v6a2 2 0 0 1 2 2zm-2 2h18v-6H3v6z"
                />
              </svg>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/user/orders"}
              className="flex items-center px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current"
                  d="M12 1L2 5.8V18l10 4 10-4V5.8L12 1zM6.2 6L12 3.5 17.8 6L12 8.5 6.2 6zM4 9.4V17l8 3.2 8-3.2V9.4l-8 3.2-8-3.2zm4-1.9l5.8 2.3L16 10.4 10.2 8l-2.2.9zm6 0v1.7l-5.8 2.3L8 10.4l5.8-2.3L16 7.5zM4 19h16v2H4v-2z"
                />
              </svg>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminMenu;
