import React from "react";

const Header: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-4 flex items-center gap-6 z-10 shadow-[0px_4px_14px_0px_rgba(231,_237,_240,_0.3)] w-full">
      <img src="/recrutei-logo.svg" alt="recrutei-logo" />
      <p className="text-main text-sm font-bold">Teste vaga front</p>
    </div>
  );
};

export default Header;
