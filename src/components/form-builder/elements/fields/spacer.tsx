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
import { BetweenHorizonalStart, Heading1 } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";

const type: ElementsType = "spacerField";

const extraAttributes = {
	height: 20,
};

const propertiesSchema = z.object({
	height: z.number().min(5).max(200),
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

interface CustomInstance extends FormElementInstance {
	extraAttributes: typeof extraAttributes;
}

export const DesignerComponent = ({
	elementInstance,
}: { elementInstance: FormElementInstance }) => {
	const element = elementInstance as CustomInstance;
	const { updateElement } = useDesigner();
	const { height } = element.extraAttributes;
	return (
		<div className="flex flex-col gap-2 w-full items-center">
			<Label className="text-muted-foreground">Spacer field: {height}px</Label>
			<BetweenHorizonalStart className="h-8 w-8"/>
		</div>
	);
};

export const FormComponent = ({
	elementInstance,
	submitValue,
}: {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
}) => {
	const element = elementInstance as CustomInstance;
	const { height } = element.extraAttributes;
	return <div style={{height, width: "100%"}}>

	</div>;
};

export const PropertiesComponent = ({
	elementInstance,
}: { elementInstance: FormElementInstance }) => {
	const element = elementInstance as CustomInstance;
	const { updateElement } = useDesigner();
	const form = useForm<PropertiesSchema>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			height: element.extraAttributes.height,
		},
	});
	useEffect(() => form.reset(element.extraAttributes), [element, form]);

	const applyChanges = (v: PropertiesSchema) => {
		const { height } = v;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				height,
			},
		});
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) =>
		e.preventDefault();

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Enter") e.currentTarget.blur();
	};

	return (
		<Form {...form}>
			<form
				onBlur={form.handleSubmit(applyChanges)}
				className="space-y-3"
				onSubmit={handleSubmit}
			>
				<FormField
					control={form.control}
					name="height"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Height {form.watch("height")} px</FormLabel>
							<FormControl className="pt-2">
								<Slider defaultValue={[field.value]} min={5} max={200} step={1} onValueChange={v => field.onChange(v[0])}/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export const SpacerFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButton: {
		icon: BetweenHorizonalStart,
		label: "Spacer Field",
	},
	designerComponent: DesignerComponent,
	formComponent: FormComponent,
	propertiesComponent: PropertiesComponent,
	validate: () => true,
};
