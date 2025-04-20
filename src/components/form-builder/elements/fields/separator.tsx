"use client";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading1, SeparatorHorizontal } from "lucide-react";
import { FormEventHandler, KeyboardEventHandler, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	ElementsType,
	FormElement,
	FormElementInstance,
	SubmitFunction,
} from "..";
import { useDesigner } from "../../designer/context";
import { Separator } from "@/components/ui/separator";

const type: ElementsType = "separatorField";

export const DesignerComponent = ({
	elementInstance,
}: { elementInstance: FormElementInstance }) => {
	const { updateElement } = useDesigner();
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className="text-muted-foreground">Separator field</Label>
			<Separator/>
		</div>
	);
};

export const FormComponent = () => {
	return <Separator/>;
};

export const PropertiesComponent = () => {
return <p>No properties for this element</p>
};

export const SeparatorFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
	}),
	designerButton: {
		icon: SeparatorHorizontal,
		label: "Separator Field",
	},
	designerComponent: DesignerComponent,
	formComponent: FormComponent,
	propertiesComponent: PropertiesComponent,
	validate: () => true,
};
