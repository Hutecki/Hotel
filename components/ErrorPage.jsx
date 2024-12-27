// components/ErrorPage.js

import React from "react";
import Link from "next/link";

const ErrorPage = ({
  title = "Error",
  message = "Something went wrong",
  linkText = "Go Back",
  linkHref = "/",
}) => {
  return (
    <section className="bg-white min-h-screen flex-grow">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2">{title}</h1>
            <p className="text-gray-500 text-xl mb-10">{message}</p>

            <Link
              className="ui-Link  font-bold py-4 px-6 rounded"
              href={linkHref}
            >
              {linkText}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default ErrorPage;
