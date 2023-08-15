import {
  FileDown,
  HomeIcon,
  Import,
  LogIn,
  LogOut,
  Menu,
  Save,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserHero } from "./UserHero";
import { Button } from "./ui/button";
import { useState } from "react";
import { api } from "~/utils/api";
import { useToast } from "./ui/use-toast";
import { useCourse } from "~/context/CourseContext";
import { ExportModal } from "./modals/ExportModal";
import { ImportModal } from "./modals/ImportModal";

export const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const { mutate: updatePlan } = api.plan.updatePlan.useMutation();
  const { toast } = useToast();
  const { selectedCourses } = useCourse();
  const router = useRouter();
  const canExportPlan = router.asPath.includes("planner");
  const planId = router.asPath.split("/")[2];
  const savePlan = () => {
    if (!planId) return;

    updatePlan({ id: planId, courses: selectedCourses });
    toast({
      title: "Planen sparad",
      description: "Din plan har sparats",
      variant: "success",
    });
  };

  const navigateToDashboard = () => {
    router.push(`/dashboard/${session?.user.id}`);
  };

  return (
    <main>
      <section className="absolute right-4">
        <div className="flex flex-row gap-6">
          {session && <UserHero />}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"}>
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-8 w-fit">
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={navigateToDashboard}
                disabled={!session}
              >
                <HomeIcon className="mr-2 h-4 w-4" />
                <span>Hem</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={!canExportPlan}
                onClick={() => setIsOpen(true)}
                className={"hover:cursor-pointer"}
              >
                <FileDown className="mr-2 h-4 w-4" />
                <span>Exportera</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsImportOpen(true)}
                className={"hover:cursor-pointer"}
              >
                <Import className="mr-2 h-4 w-4" />
                <span>Importera</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={!canExportPlan || !session}
                onClick={savePlan}
                className={"hover:cursor-pointer"}
              >
                <Save className="mr-2 h-4 w-4" />
                <span>Spara</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  session
                    ? signOut({
                        callbackUrl: "http://localhost:3000/",
                      })
                    : signIn("google", {
                        callbackUrl: "http://localhost:3000/planner",
                        redirect: false,
                      })
                }
                className="hover:cursor-pointer"
              >
                {session ? (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logga ut</span>
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Logga in</span>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
      <ExportModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />
    </main>
  );
};
