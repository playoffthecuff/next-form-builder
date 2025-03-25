import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

function PreviewDialogButton() {
	return (
		<Button variant={"outline"} className="gap-2">
			<Eye className="h-6 w-6"/>
			Preview
		</Button>
	);
}
export default PreviewDialogButton;
