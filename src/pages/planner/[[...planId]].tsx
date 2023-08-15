import { useRouter } from "next/router";
import { useEffect } from "react";
import { Header } from "~/components/Header";
import { SemesterTable } from "~/components/SemesterTable";
import { useCourseDispatch } from "~/context/CourseContext";
import { Course } from "~/types/course";
import { api } from "~/utils/api";

export default function Home({ planId }: { planId: string[] }) {
  const router = useRouter();
  const { data, isLoading } = api.plan.getCoursesByPlanId.useQuery(
    planId && planId[0] ? planId[0] : null
  );
  console.log(planId, isLoading);

  const dispatch = useCourseDispatch();

  useEffect(() => {
    dispatch({ type: "RESET" });
    if (data) {
      data.map((course: Course) => {
        dispatch({
          type: "ADD_COURSE",
          payload: course,
          year: course.year,
          period: course.periodNum,
        });
      });
    }
  }, [data, planId]);
  return (
    <main className="flex flex-col justify-center px-4">
      <div className="flex items-center justify-center py-4">
        <p className=" text-center text-5xl font-bold">Master Planner</p>
        <Header />
      </div>
      <div>
        {[7, 8, 9, 10].map((y) => (
          <SemesterTable year={y} key={y} />
        ))}
      </div>
    </main>
  );
}

//Check if the planId is valid
export async function getServerSideProps(context: any) {
  const planId = context.query.planId ? context.query.planId : null;
  if (planId) {
    if (planId.length > 1) {
      return {
        redirect: {
          destination: "",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      planId,
    },
  };
}
