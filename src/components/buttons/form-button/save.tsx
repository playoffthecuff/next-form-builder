import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function SaveFormButton() {
	return (
		<Button variant={"outline"} className="gap-2">
			<Save className="w-4 h-4" />
			Save
		</Button>
	);
}
