"use client";
//Use client necessario pois é um componente que ocorre interatividade

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

//Exemplo de uso

// <NextAuthProvider>
// <SomeComponent/>
// </NextAuthProvider>
