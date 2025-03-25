import { getFormById } from "@/actions/form";
import FormBuilder from "@/components/form-builder";

export default async function Page({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const form = await getFormById(+params.id);
	if (!form) throw new Error("form not found");
	return <FormBuilder form={form} />;
}
