import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const CreateProduct = () => {
  return (
    <Layout title={"Create Product"}>
      <div className=" mx-auto">
        <div className="flex">
          <div className="">
            <AdminMenu />
          </div>
          <div className="ml-2 mt-2 flex-1">
            <h1>Create Product </h1>{" "}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
