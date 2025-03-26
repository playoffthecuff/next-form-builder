"use client";
import {DndContext, MouseSensor, TouchSensor, useDroppable, useSensor, useSensors} from "@dnd-kit/core";
import { Form } from "@prisma/client";
import { PublishFormButton } from "../buttons/form-button/publish";
import SaveFormButton from "../buttons/form-button/save";
import PreviewDialogButton from "../buttons/preview-dialog";
import { Designer } from "./designer";
import { DragOverlayWrapper } from "./drag-overlay-wrapper";

export default function FormBuilder({ form }: { form: Form }) {
	const droppable = useDroppable({
		id: "designer-drop-area",
		data: {isDesignerDropArea: true}
	});

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		}
	})

	const sensors = useSensors(mouseSensor);

	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 300,
			tolerance: 5,
		}
	})

	return (
		<DndContext sensors={sensors}>
			<div className="flex flex-col justify-between border-b-2 gap-3 items-center w-full">
				<div className="flex justify-between items-center w-full">
					<h2 className="truncate font-medium">
						<span className="text-muted-foreground MR-2">Form: </span>
									{form.name}
					</h2>
								<div className="flex items-center gap-2">
									<PreviewDialogButton/>
									{!form.published && <><SaveFormButton/><PublishFormButton/></>}
								</div>
				</div>
				<div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-50 bg-accent bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)]">
					<Designer/>
				</div>
			</div>
			<DragOverlayWrapper />
		</DndContext>
	);
}
