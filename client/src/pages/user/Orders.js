import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"User Orders"}>
      <div className=" mx-auto">
        <div className="flex">
          <div className="">
            <UserMenu />
          </div>

          <div className="ml-2 mt-2 flex-1">
            <h1>Orders</h1>
            <p>{JSON.stringify(orders, null, 4)}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
