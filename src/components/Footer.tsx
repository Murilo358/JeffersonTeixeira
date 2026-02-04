import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-whitePrimary mt-5 justify-center p-5 items-center flex flex-col">
      <Image src="/logo-3.png" width={50} height={23} alt="Jefferson teixeira" />
      <p className="text-sm font-semibold text-primaryDarker">
        Todos os direitos reservados
      </p>
    </div>
  );
};

export default Footer;
