import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export const UserHero = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-800 pr-4 text-white">
      <Avatar>
        <AvatarImage src={session?.user.image + ""} />
        <AvatarFallback className="text-black">MP</AvatarFallback>
      </Avatar>
      <p>{session?.user.name}</p>
    </div>
  );
};
