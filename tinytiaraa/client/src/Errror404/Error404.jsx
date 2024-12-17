import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-white">
      <section className="text-center">
        <div className="flex flex-col justify-center items-center py-7">
          <div className="w-full h-[400px] bg-center bg-cover mt-3" style={{ backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)" }}>
            <h1 className="text-8xl font-[600]">404</h1>
          </div>

          <div className="mt-[-40px]">
            <h3 className="text-2xl font-bold">Looks like you're lost</h3>
            <p className="text-lg mt-4">The page you are looking for is not available!</p>
            <Link to="/" className="mt-6 inline-block bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700">
              Go to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error404;
