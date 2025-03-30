"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error }: { error: Error }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="gap-y-4 flex w-full h-full mx-auto flex-grow flex-col items-center justify-center">
			<h2 className="text-destructive text-4xl">Something went wrong!</h2>
			<Button asChild>
				<Link href="/">
					<Home />
				</Link>
			</Button>
		</div>
	);
}
