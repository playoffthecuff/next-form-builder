import Logo from "@/components/header/children/logo";
import { ModeToggle } from "@/components/header/children/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";

function Layout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav><Logo/><ModeToggle/><UserButton /></nav>
      <main className="flex w-fit flex-grow">{children}</main>
    </div>
  )
}
export default Layout