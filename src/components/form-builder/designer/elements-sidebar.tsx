import { SidebarButton } from "@/components/buttons/form-button/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { FormElements } from "../elements";

export default function FormElementsSidebar() {
	return (
		<>
			<p className="text-sm text-foreground/70">DnD elements</p>
			<Separator className="my-2" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
				<p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
					Layout elements
				</p>
				<SidebarButton formElement={FormElements.textField} />
				<SidebarButton formElement={FormElements.titleField} />
				<SidebarButton formElement={FormElements.paragraphField} />
				<SidebarButton formElement={FormElements.separatorField} />
				<SidebarButton formElement={FormElements.spacerField} />
				<p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
					Form elements
				</p>
				<SidebarButton formElement={FormElements.subtitleField} />
				<SidebarButton formElement={FormElements.numberField} />
				<SidebarButton formElement={FormElements.textAreaField} />
				<SidebarButton formElement={FormElements.dateField} />
			</div>
		</>
	);
}
