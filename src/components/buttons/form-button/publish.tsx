import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";

export const PublishFormButton = () => {
	return (
		<Button variant={"outline"} className="text-white bg-gradient-to-r from-indigo-500 to-cyan-700">
			<BookPlus className="w-4 h-4"/>
			Publish
		</Button>
	);
};
