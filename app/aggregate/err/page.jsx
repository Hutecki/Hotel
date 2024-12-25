import React from "react";
import ErrorPage from "@/components/ErrorPage";
const Error = () => {
  return (
    <ErrorPage
      title="Nie znaleziono pokoju"
      message="Pokój nie istnieje"
      linkText="Wróć"
      linkHref="/"
    />
  );
};

export default Error;
