import { api } from "~/utils/api";

export default function Home() {
  const semesters = api.semester.getAll.useQuery();

  return <main>Hello world: {JSON.stringify(semesters.data)}</main>;
}
