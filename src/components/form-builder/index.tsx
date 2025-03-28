"use client";
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useDroppable,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { Form } from "@prisma/client";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PublishFormButton } from "../buttons/form-button/publish";
import SaveFormButton from "../buttons/form-button/save";
import PreviewDialogButton from "../buttons/preview-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Designer } from "./designer";
import { useDesigner } from "./designer/context";
import { DragOverlayWrapper } from "./drag-overlay-wrapper";
import Confetti from "react-confetti";

export default function FormBuilder({ form }: { form: Form }) {
	const { setElements } = useDesigner();
	const [isReady, setIsReady] = useState(false);

	const droppable = useDroppable({
		id: "designer-drop-area",
		data: { isDesignerDropArea: true },
	});

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	});

	const sensors = useSensors(mouseSensor);

	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 300,
			tolerance: 5,
		},
	});

	useEffect(() => {
		if (isReady) return;
		const elements = JSON.parse(form.content);
		setElements(elements);
		setIsReady(true);
		const readyTimeout = setTimeout(() => setIsReady(true), 500);
		return () => clearTimeout(readyTimeout);
	}, [form, setElements, isReady]);

	if (!isReady) {
		return (
			<div className="flex flex-col items-center justify-center w-full h-full">
				<LoaderCircle className="animate-spin" />
			</div>
		);
	}

	const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;
	const handleClick = () => {
		navigator.clipboard.writeText(shareUrl);
		toast("Copied!", {
			description: "link copied to clipboard",
		});
	};

	if (form.published) {
		return (
			<>
			<Confetti width={window.innerWidth} height={innerHeight} recycle={false} numberOfPieces={512}/>
				<div className="flex flex-col items-center justify-center h-full w-full ">
					<div className="max-w-md">
						<h1 className="text-center text-4xl font-medium text-primary border-bottom pb-2 mb-10">
							Form published! 🎉🎉🎉
						</h1>
						<h2 className="text-2xl">Share this form</h2>
						<h3 className="text-xl text-muted-foreground border-b pb-10">
							Anyone with the link can view and submit the form
						</h3>
						<div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
							<Input className="w-full " readOnly value={shareUrl} />
							<Button className="mt-2 w-full" onClick={handleClick}>
								Copy link
							</Button>
						</div>
						<div className="flex justify-between">
							<Button variant={"link"} asChild>
								<Link href="/" className="gap-2">
									<ArrowLeft />
								</Link>
								Go back home
							</Button>
							<Button variant={"link"} asChild>
								<Link href={`/forms/${form.id}`} className="gap-2">
									<ArrowRight />
								</Link>
								Form details
							</Button>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<DndContext sensors={sensors}>
			<div className="flex flex-col justify-between border-b-2 gap-3 items-center w-full">
				<div className="flex justify-between items-center w-full">
					<h2 className="truncate font-medium">
						<span className="text-muted-foreground MR-2">Form: </span>
						{form.name}
					</h2>
					<div className="flex items-center gap-2">
						<PreviewDialogButton />
						{!form.published && (
							<>
								<SaveFormButton id={form.id} />
								<PublishFormButton id={form.id} />
							</>
						)}
					</div>
				</div>
				<div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-50 bg-accent bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)]">
					<Designer />
				</div>
			</div>
			<DragOverlayWrapper />
		</DndContext>
	);
}
