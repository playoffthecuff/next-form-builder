import { getFormById } from "@/actions/form";
import LinkShare from "@/components/buttons/form-button/link-share";
import VisitButton from "@/components/buttons/form-button/visit";
import StatsCard from "@/components/cards/card-stats/stats-card";
import SubmissionsTable from "@/components/form-builder/submissions-table";
import { CircleCheckBig, CircleX, Clock10, Eye } from "lucide-react";

export default async function Page({
	params,
}: {
	params: Promise<{
		id: string;
	}>;
}) {
	const id = (await params).id;
	const form = await getFormById(+id);
	if (!form) throw new Error("form not found");

	const { visits, submissions } = form;

	let submissionsRate = 0;

	if (visits > 0) submissionsRate = (submissions / visits) * 100;
	const bounceRate = 100 - submissionsRate;

	return (
		<>
			<div className="py-10 border-t border-b border-muted">
				<div className="flex justify-between container">
					<h1 className="text-4xl font-bold truncate">{form.name}</h1>
					<VisitButton shareUrl={form.shareUrl} />
				</div>
			</div>
			<div className="py-4 border-b border-muted">
				<div className="container flex gap-2 items-center justify-between">
					<LinkShare shareUrl={form.shareUrl} />
				</div>
			</div>
			<div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
				<StatsCard
					title="Total visits"
					icon={<Eye className="text-blue-600" />}
					helperText="All time form visits"
					value={visits.toLocaleString() ?? ""}
					loading={false}
					className="shadow-md shadow-blue-600"
				/>
				<StatsCard
					title="Total submissions"
					icon={<Clock10 className="text-yellow-600" />}
					helperText="All time submissions"
					value={submissions.toLocaleString() ?? ""}
					loading={false}
					className="shadow-md shadow-yellow-600"
				/>
				<StatsCard
					title="Submissions rate"
					icon={<CircleCheckBig className="text-green-600" />}
					helperText="Visits in result in form submission"
					value={submissionsRate.toLocaleString() ?? "" + "%"}
					loading={false}
					className="shadow-md shadow-green-600"
				/>
				<StatsCard
					title="Bounce rate"
					icon={<CircleX className="text-red-600" />}
					helperText="Visits that leaves without interacting"
					value={submissionsRate.toLocaleString() ?? "" + "%"}
					loading={false}
					className="shadow-md shadow-red-600"
				/>
			</div>
			<div className="container pt-10">
				<SubmissionsTable id={form.id}/>
			</div>
		</>
	);
}
