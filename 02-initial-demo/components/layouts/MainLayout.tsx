import { FC, PropsWithChildren } from "react";

import Head from "next/head";
import { Inter } from "next/font/google";

import styles from "./MainLayout.module.css";
import { Navbar } from "../Navbar";

const inter = Inter({ subsets: ["latin"] });

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Home - Gary</title>
        <meta name="description" content="Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={`${styles.main} ${inter.className}`}>{children}</main>
    </>
  );
};
