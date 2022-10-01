import type { NextPage } from "next";
import { useRouter } from "next/router";

const GamePage: NextPage = () => {
  const router = useRouter();
  const { redirect } = router.query;
  router.push(redirect + "?user=something");
  return <></>;
};

export default GamePage;
