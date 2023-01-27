import { CONFIG } from "@/constants/default";
import { InferGetStaticPropsType } from "next";

export default function Home({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <h1>Hello {user}</h1>;
}

export async function getStaticProps() {
  const res = await fetch(`${CONFIG.SERVER_URL}/users`, { method: "POST" });
  const data = await res.json();

  return {
    props: {
      user: data.user,
    },
  };
}
