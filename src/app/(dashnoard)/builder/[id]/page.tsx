import { getFormById } from "@/actions/form";
import FormBuilder from "@/components/form-builder";

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
	return <FormBuilder form={form} />;
}
