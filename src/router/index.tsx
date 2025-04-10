import React from "react";

import { Route, Routes } from "react-router-dom";

import pages from "./pages";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {pages.map((page) => (
        <Route
          key={page.route}
          path={page.route}
          element={<page.component />}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
