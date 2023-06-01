import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {  useEffect } from "react";
import { useAuth } from "src/hooks/use-auth";
import { useRouter } from "next/router";

const Page = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      router.push("/users");
    }
  }, []);

  return <></>;
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
