import React from "react";
import ErrorPage from "@/components/ErrorPage";
const Error = () => {
  return (
    <ErrorPage
      title="Nie znaleziono miejsca"
      message="Miejsce nie istnieje"
      linkText="Wróć"
      linkHref="/aggregate"
    />
  );
};

export default Error;
