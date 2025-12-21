import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <div className="row"><Navbar /></div>

      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundImage: "url('/images/ems-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div
          className="p-3 text-white bg-dark bg-opacity-75 border border-dark rounded-3"
          style={{ marginTop: "-200px" }}
        >
          <h1 className="text-center">
            Welcome to EMS Home Page
          </h1>
        </div>




      </div>

    </>
  )
};

export default Home;
