"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	DragEndEvent,
	useDndMonitor,
	useDraggable,
	useDroppable,
} from "@dnd-kit/core";
import { Trash } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { ElementsType, FormElementInstance, FormElements } from "../elements";
import { useDesigner } from "./context";
import { DesignerSideBar } from "./sidebar";

const DesignerElementWrapper = ({
	element,
}: { element: FormElementInstance }) => {
	const [isMouseOver, setIsMouseOver] = useState(false);
	const { removeElement, selectedElement, setSelectedElement } = useDesigner();

	const DesignerElement = FormElements[element.type].designerComponent;
	const topHalf = useDroppable({
		id: `${element.id}-top`,
		data: {
			type: element.type,
			elementId: element.id,
			isTopHalfDesignerElement: true,
		},
	});
	const bottomHalf = useDroppable({
		id: `${element.id}-bottom`,
		data: {
			type: element.type,
			elementId: element.id,
			isBottomHalfDesignerElement: true,
		},
	});

	const draggable = useDraggable({
		id: `${element.id}-drag-handler`,
		data: {
			type: element.type,
			elementId: element.id,
			isDesignerElement: true,
		},
	});

	if (draggable.isDragging) return null;

	const handleMouseEnter = () => setIsMouseOver(true);
	const handleMouseLeave = () => setIsMouseOver(false);
	const handleRemoveElement: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation();
		removeElement(element.id);
	};
	const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		setSelectedElement(element);
	};

	return (
		<div
			ref={draggable.setNodeRef}
			{...draggable.listeners}
			{...draggable.attributes}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
			className="relative h-30 flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
		>
			<div
				ref={topHalf.setNodeRef}
				className={cn("absolute w-full h-1/2 rounded-t-md")}
			/>
			<div
				ref={bottomHalf.setNodeRef}
				className={cn("absolute w-full h-1/2 rounded-b-md bottom-0")}
			/>
			{isMouseOver && (
				<>
					<div className="absolute right-0 h-full">
						<Button
							className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
							variant={"outline"}
							onClick={handleRemoveElement}
						>
							<Trash style={{ height: 24, width: 24 }} />
						</Button>
					</div>
					<div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 animate-pulse">
						<p className="text-muted-foreground text-sm">
							Click for properties or drag to move
						</p>
					</div>
				</>
			)}
			{topHalf.isOver && (
				<div className="absolute top-0 w-full rounded-md rounded-b-none h-2 bg-primary" />
			)}
			<div
				className={cn(
					"flex w-full h-30 items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
					isMouseOver && "opacity-30",
				)}
			>
				<DesignerElement elementInstance={element} />
			</div>
			{bottomHalf.isOver && (
				<div className="absolute bottom-0 w-full rounded-md rounded-t-none h-2 bg-primary" />
			)}
		</div>
	);
};

export const Designer = () => {
	const { elements, addElement, selectedElement, setSelectedElement, removeElement } =
		useDesigner();
	const droppable = useDroppable({
		id: "designer-drop-area",
		data: {
			isDesignerDropArea: true,
		},
	});

	useDndMonitor({
		onDragEnd: (e: DragEndEvent) => {
			const { active, over } = e;
			if (!active || !over) return;
			const isDesignerButtonElement =
				active.data?.current?.isDesignerButtonElement;

			const isDroppingOverDesignerDropArea =
				over.data?.current?.isDesignerDropArea;

			const droppingSidebarButtonOverDesignerDropArea =
				isDesignerButtonElement && isDroppingOverDesignerDropArea;

			if (droppingSidebarButtonOverDesignerDropArea) {
				const type: ElementsType = active.data.current?.type;
				const newEl = FormElements[type].construct(crypto.randomUUID());
				addElement(elements.length, newEl);
				return;
			}
			const isDroppingOverDesignerElementTopHalf =
				over.data?.current?.isTopHalfDesignerElement;
			const isDroppingOverDesignerElementBottomHalf =
				over.data?.current?.isBottomHalfDesignerElement;
			const isDroppingOverDesignerElement =
				isDroppingOverDesignerElementTopHalf ||
				isDroppingOverDesignerElementBottomHalf;
			const droppingSidebarButtonOverDesignerElement =
				isDesignerButtonElement && isDroppingOverDesignerElement;

			if (droppingSidebarButtonOverDesignerElement) {
				const type: ElementsType = active.data.current?.type;
				const newEl = FormElements[type].construct(crypto.randomUUID());

				const overId = over.data?.current?.elementId;

				const overElIndex = elements.findIndex((el) => el.id === overId);
				if (overElIndex === -1) throw new Error("element not found");
				let newElementIndex = overElIndex;
				if (isDroppingOverDesignerElementBottomHalf) newElementIndex++;
				addElement(newElementIndex, newEl);
				return;
			}
			const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
			const draggingDesignerElementOverAnotherDesignerElement =
				isDroppingOverDesignerElement && isDraggingDesignerElement;
			if (draggingDesignerElementOverAnotherDesignerElement) {
				const activeId = active.data?.current?.elementId;
				const overId = over.data?.current?.elementId;
				const activeElementIndex = elements.findIndex(
					(el) => el.id === activeId,
				);
				const overElementIndex = elements.findIndex((el) => el.id === overId);
				if (activeElementIndex === -1 || overElementIndex === -1)
					throw new Error("element not found");

				const activeElement = {...elements[activeElementIndex]};
				removeElement(activeId);
				let newElementIndex = overElementIndex;
				if (isDroppingOverDesignerElementBottomHalf) newElementIndex++;
				addElement(newElementIndex, activeElement);
			}
		},
	});

	const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		setSelectedElement(null);
	};

	return (
		<div className="flex w-full h-full">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div className="p-4 w-full" onClick={handleClick}>
				<div
					ref={droppable.setNodeRef}
					className={cn(
						"bg-background max-w-5xl h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
						droppable.isOver && "ring-6 ring-inset ring-primary",
					)}
				>
					{!droppable.isOver && !elements.length && (
						<p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
							Drop here
						</p>
					)}
					{droppable.isOver && elements.length === 0 && (
						<div className="p-4 w-full">
							<div className="h-30 rounded-md bg-primary/20" />
						</div>
					)}
					{elements.length > 0 && (
						<div className="flex flex-col w-full gap-2 p-4">
							{elements.map((el) => (
								<DesignerElementWrapper key={el.id} element={el} />
							))}
						</div>
					)}
				</div>
			</div>
			<DesignerSideBar />
		</div>
	);
};
