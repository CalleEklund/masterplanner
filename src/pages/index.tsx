import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <p className="mb-8 text-6xl">LIU Masterplanner</p>

      <section className="flex flex-row gap-4">
        <Button
          size={"lg"}
          onClick={() => {
            router.push("/planner/");
          }}
        >
          Skapa en ny plan
        </Button>
        <Button
          size={"lg"}
          onClick={() => {
            session
              ? signOut()
              : signIn("google", {
                  redirect: false,
                  callbackUrl: "http://localhost:3000/",
                });
          }}
        >
          {session ? "Logga ut" : "Logga in"}
        </Button>
      </section>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getServerAuthSession(context);
  if (session?.user) {
    return {
      redirect: {
        destination: `/dashboard/${session.user.id}`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
