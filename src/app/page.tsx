import CreateFormButton from "@/components/buttons/form-button/create";
import StatsCards from "@/components/cards/card-stats/stats-cards";
import FormCards from "@/components/cards/form/cards";
import FormCardSkeleton from "@/components/cards/form/skeleton";
import CardStatsWrapper from "@/components/cards/wrapper";
import { Separator } from "@/components/ui/separator";
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
		</>
	);
}
