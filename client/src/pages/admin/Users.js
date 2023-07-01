import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  return (
    <Layout title={"Dashboard-Admin User"}>
      <div className=" mx-auto">
        <div className="flex">
          <div className="">
            <AdminMenu />
          </div>
          <div className="ml-2 mt-2 flex-1">All Users</div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
