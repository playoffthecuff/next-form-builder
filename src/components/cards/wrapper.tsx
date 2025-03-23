import { GetFormStats } from "@/actions/form";
import StatsCards from "./card-stats/stats-cards";

export default async function CardStatsWrapper() {
	const stats = await GetFormStats();
	return <StatsCards loading={false} data={stats} />;
}
