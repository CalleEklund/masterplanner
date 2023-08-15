import { Info, PlusCircle } from "lucide-react";
import { useRouter } from "next/router";
import { Header } from "~/components/Header";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

type Plan = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
};

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = api.user.getUserPlans.useQuery();
  const { mutateAsync, isLoading: isCreatePlanLoading } =
    api.plan.createPlan.useMutation();
  if (isLoading) return <p>Loading...</p>;
  const navigateToPlan = (id: string) => {
    router.push(`/planner/${id}`);
  };

  const createPlan = async () => {
    const res = await mutateAsync();
    if (!isCreatePlanLoading && res) {
      router.push(`/planner/${res.id}`);
    }
  };

  return (
    <main className="flex flex-col justify-center px-4">
      <div className="flex items-center justify-center py-4">
        <p className=" text-center text-5xl font-bold">Översikt</p>
        <Header />
      </div>
      <div className="mt-4 flex  w-full justify-center">
        <section className=" grid w-4/5 grid-cols-6 place-content-center gap-4">
          {data?.plan.map((plan: Plan) => {
            return (
              <div className="flex flex-col" key={plan.id}>
                <div className="group flex h-28 items-center justify-center rounded-lg border-2 bg-gray-500/50 p-3 backdrop-blur-sm">
                  <Button
                    className="w-4/5 opacity-0 transition duration-300 hover:ease-in-out group-hover:opacity-100"
                    onClick={() => navigateToPlan(plan.id)}
                  >
                    Fortsätt
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-center ">{plan.name}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={18} />
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <div>
                          <p className="text-center text-sm">
                            {`Uppdaterad: ${formatDate(plan.updatedAt)}`}
                          </p>
                          <p className="text-center text-sm">
                            {`Skapad: ${formatDate(plan.createdAt)}`}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            );
          })}
          <div className="flex h-28 items-center justify-center rounded-lg border-2 bg-gray-500/50 p-3 backdrop-blur-sm">
            <PlusCircle
              size={48}
              color="white"
              className="transform cursor-pointer transition-all hover:scale-110"
              onClick={createPlan}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

const formatDate = (date: Date) => {
  return date.toLocaleString("sv-SE", {
    timeStyle: "short",
    dateStyle: "short",
  });
};

export const getServerSideProps = async (context: any) => {
  const session = await getServerAuthSession(context);
  const { userId } = context.params;
  if (!session || session.user.id !== userId || !userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      userId,
    },
  };
};
