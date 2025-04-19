import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen">
			{children}
		</div>
	);
}