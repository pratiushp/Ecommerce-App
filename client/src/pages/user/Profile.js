import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
const Profile = () => {
  return (
    <Layout title={"User Profile"}>
      <div className=" mx-auto">
        <div className="flex">
          <div className="">
            <UserMenu />
          </div>

          <div className="ml-2 mt-2 flex-1">
            <h1>Your Profile</h1>{" "}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
