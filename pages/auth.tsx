import type { NextPage } from "next";
import { useRouter } from "next/router";

const AuthPage: NextPage = () => {
  const router = useRouter();
  const { redirect } = router.query;
  router.push(redirect + "?user=something");
  return <></>;
};

export default AuthPage;
