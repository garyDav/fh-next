import Link from "next/link";
import { MainLayout } from "../components/layouts/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <h3>Home Page</h3>
      <h1 className={"title"}>
        {/* Ir a <a href="/about">About</a> */}
        Ir a <Link href="/about">About</Link>
      </h1>
      <p>
        Get started by editing&nbsp;
        <code className={"code"}>pages/index.jsx</code>
      </p>
    </MainLayout>
  );
}
