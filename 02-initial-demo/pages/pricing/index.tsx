import Link from "next/link";
import { MainLayout } from "../../components/layouts/MainLayout";

export default function PricingPage() {
  return (
    <>
      <h3>Pricing Page</h3>
      <h1 className={"title"}>
        Ir a <Link href="/">Home</Link>
      </h1>
      <p>
        <code className={"code"}>pages/pricing/index.jsx</code>
      </p>
    </>
  );
}

PricingPage.getLayout = function getLaout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>;
};
