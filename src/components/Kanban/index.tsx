import React from "react";
import ColumnTitle from "./ColumnTitle";

const Kanban: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <ColumnTitle>Ideias</ColumnTitle>
      <ColumnTitle>A fazer</ColumnTitle>
      <ColumnTitle>Fazendo</ColumnTitle>
      <ColumnTitle>Feito</ColumnTitle>
    </div>
  );
};

export default Kanban;
