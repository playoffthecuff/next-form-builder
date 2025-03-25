import { FormElement } from "@/components/form-builder/elements";
import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/core";

export const SidebarDragOverlayButton = ({
	formElement,
}: { formElement: FormElement }) => {
	const { label, icon: Icon } = formElement.designerButton;
	const draggable = useDraggable({
		id: `designer-btn-${formElement.type}`,
		data: {
			type: formElement.type,
			isDesignerButtonElement: true,
		},
	});
	return (
		<Button
			className={"flex flex-col gap-2 h-30 w-30 hover:cursor-grab bg-background"}
			variant={"outline"}
		>
			<Icon className="text-primary" style={{width: 24, height: 24}}/>
			<p className="text-xs">{label}</p>
		</Button>
	);
};