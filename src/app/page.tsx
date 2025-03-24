import CreateFormButton from "@/components/buttons/form-button/create";
import StatsCards from "@/components/cards/card-stats/stats-cards";
import FormCards from "@/components/cards/form/cards";
import FormCardSkeleton from "@/components/cards/form/skeleton";
import CardStatsWrapper from "@/components/cards/wrapper";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
	return (
		<>
			<main className="flex-grow">
				<div className="container pt-4 w-full mx-auto">
					<Suspense fallback={<StatsCards loading={true} />}>
						<CardStatsWrapper />
					</Suspense>
					<Separator className="my-6" />
					<h2 className="text-4xl font-bold col-span-2">Your forms</h2>
					<Separator className="my-6" />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						<CreateFormButton />
						<Suspense fallback={[1,2,3,4].map(v => <FormCardSkeleton key={v}/>)} >
							<FormCards/>
						</Suspense>
					</div>
				</div>
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Learn
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/window.svg"
						alt="Window icon"
						width={16}
						height={16}
					/>
					Examples
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/globe.svg"
						alt="Globe icon"
						width={16}
						height={16}
					/>
					Go to nextjs.org →
				</a>
			</footer>
		</>
	);
}
