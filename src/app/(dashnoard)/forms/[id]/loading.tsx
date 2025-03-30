import { LoaderCircle } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex items-center justify-center w-full h-full flex-grow">
			<LoaderCircle className="animate-spin h-12 w-12"/>
		</div>
	);
}
