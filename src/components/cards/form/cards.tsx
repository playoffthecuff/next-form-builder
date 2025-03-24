import { getForms } from "@/actions/form";
import FormCard from ".";

export default async function FormCards() {
	const forms = await getForms();
	return (
		<>
			{forms.map((f) => (
				<FormCard key={f.id} form={f} />
			))}
		</>
	);
}
