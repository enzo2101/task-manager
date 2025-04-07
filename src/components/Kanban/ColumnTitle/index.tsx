import React, { PropsWithChildren } from "react";

const ColumnTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className="grid-cols-1 text-lg font-semibold items-center p-4">
      {children}
    </p>
  );
};

export default ColumnTitle;
