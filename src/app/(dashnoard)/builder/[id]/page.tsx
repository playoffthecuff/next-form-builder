import { getFormById } from "@/actions/form";

export default async function Page({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const form = await getFormById(+params.id);
	if (!form) throw new Error("form not found");
	return <div>{form.name}</div>;
}
