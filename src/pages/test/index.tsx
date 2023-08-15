import { SemesterTable } from "~/components/SemesterTable";
import { columns } from "~/components/coursedatatable/columns";
import { Header } from "~/components/Header";
import { api } from "~/utils/api";
import { DataTable } from "~/components/coursedatatable/data-table";
/**
 * TODO:
 * - Skapa konto och logga in, spara planer till användare ✅
 * - Lägg till en export funktion ✅
 * - Skapa en dashboard för användaren där den kan se alla sina planer ✅
 * - Extracta Header ✅
 * - Om man redigerar en redan existerande tabell gör så att den blir uppdaterad i databasen ✅
 * - Gör tabellen sorterbar och filtrerbar på namn och code ✅
 * - Lägg till en import funktion
 * - Lägg till de olika inriktningarna
 * - Skapa en ordentlig parser som som läser in kurserna
 * - Lös något sätt att lägga in planer i contexten
 *
 * BUGS:
 * - Om du håller på med en planering och loggar in så försvinner den
 * - Om du byter snabbt mellan planer så byter den inte korrekt ✅
 */
export default function Home() {
  const { data } = api.course.getAll.useQuery();
  console.log("data", data);
  return (
    <main className=" px-4">
      {data && (
        <DataTable
          columns={columns}
          data={data}
          addCourse={(c) => {
            console.log("c", c);
          }}
        />
      )}
    </main>
  );
}
