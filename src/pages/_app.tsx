import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Dialog } from "~/components/ui/dialog";
import { Toaster } from "~/components/ui/toaster";
import { useReducer } from "react";
import { CourseProvider } from "~/context/CourseContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CourseProvider>
        <Component {...pageProps} />
      </CourseProvider>
      <Toaster />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
