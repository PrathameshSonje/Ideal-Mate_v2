import Image from "next/image";
import { auth } from "../../auth";

export default async function Home() {

  const session = await auth();

  return (
    <div>{session?.user?.email}</div>
  )
}
