import { FormElement } from "@/components/form-builder/elements";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";

export const SidebarButton = ({
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
			{...draggable.listeners}
      {...draggable.attributes}
			ref={draggable.setNodeRef}
			className={cn("flex flex-col gap-2 h-30 w-30 hover:cursor-grab", draggable.isDragging && "ring-2 ring-primary")}
			variant={"outline"}
		>
			<Icon className="text-primary" style={{width: 24, height: 24}}/>
			<p className="text-xs">{label}</p>
		</Button>
	);
};
