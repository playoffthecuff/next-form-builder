import { useDesigner } from "@/components/form-builder/designer/context";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Save } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function SaveFormButton({ id }: { id: number }) {
	const { elements } = useDesigner();
	const [loading, startTransition] = useTransition();

	const updateFormContent = async () => {
		try {
			const jsonElements = JSON.stringify(elements);
			await updateFormContent(id, jsonElements);
			toast("Success", {
				description: "your form has been saved",
			});
		} catch (e) {
			toast.error("Error", { description: "Something went wrong" });
		}
	};

	const handleClick = () => {
		startTransition(updateFormContent);
	};

	return (
		<Button variant={"outline"} className="gap-2" onClick={handleClick}>
			<Save className="w-4 h-4" />
			Save
			{loading && <LoaderCircle className="animate-spin" />}
		</Button>
	);
}
