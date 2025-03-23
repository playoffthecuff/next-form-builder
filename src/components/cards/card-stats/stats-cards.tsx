import { GetFormStats } from "@/actions/form";
import { Angry, CircleCheckBig, CircleX, Clock10, Eye, Send } from "lucide-react";
import StatsCard from "./stats-card";

export default function StatsCards({
	data,
	loading,
}: { data?: Awaited<ReturnType<typeof GetFormStats>>; loading: boolean }) {
	return (
		<div className="w-full pt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			<StatsCard
				title="Total visits"
				icon={<Eye className="text-blue-600"/>}
				helperText="All time form visits"
				value={data?.visits.toLocaleString() ?? ""}
				loading={loading}
				className="shadow-md shadow-blue-600"
			/>
			<StatsCard
				title="Total submissions"
				icon={<Clock10 className="text-yellow-600"/>}
				helperText="All time submissions"
				value={data?.submissions.toLocaleString() ?? ""}
				loading={loading}
				className="shadow-md shadow-yellow-600"
			/>
			<StatsCard
				title="Submissions rate"
				icon={<CircleCheckBig className="text-green-600"/>}
				helperText="Visits in result in form submission"
				value={data?.submissionsRate.toLocaleString() ?? "" + "%"}
				loading={loading}
				className="shadow-md shadow-green-600"
			/>
			<StatsCard
				title="Bounce rate"
				icon={<CircleX className="text-red-600"/>}
				helperText="Visits that leaves without interacting"
				value={data?.submissionsRate.toLocaleString() ?? "" + "%"}
				loading={loading}
				className="shadow-md shadow-red-600"
			/>
		</div>
	);
}
