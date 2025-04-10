import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import pages from "./pages";
import RoutesPath from "./routes";

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
      <Route path="*" element={<Navigate to={RoutesPath.vagas} replace />} />
    </Routes>
  );
};

export default AppRouter;
