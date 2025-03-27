import { SidebarButton } from "@/components/buttons/form-button/sidebar";
import { FormElements } from "../elements";

export default function FormElementsSidebar() {
	return (
		<aside className="bg-background w-100 flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bf-background overflow-y-auto h-full">
			Elements
			<SidebarButton formElement={FormElements.textField} />
		</aside>
	);
}
