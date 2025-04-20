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
import { Heading2 } from "lucide-react";
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

const type: ElementsType = "subtitleField";

const extraAttributes = {
	subtitle: "Subtitle field",
};

const propertiesSchema = z.object({
	subtitle: z.string().min(2).max(50),
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
	const { subtitle } = element.extraAttributes;
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className="text-muted-foreground">Title field</Label>
			<p className="text-lg">{subtitle}</p>
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
	const { subtitle } = element.extraAttributes;
	return <p className="text-xl">{subtitle}</p>;
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
			subtitle: element.extraAttributes.subtitle,
		},
	});
	useEffect(() => form.reset(element.extraAttributes), [element, form]);

	const applyChanges = (v: PropertiesSchema) => {
		const { subtitle } = v;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				subtitle,
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
					name="subtitle"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Label</FormLabel>
							<FormControl>
								<Input {...field} onKeyDown={handleKeyDown} />
							</FormControl>
							<FormDescription>
								The label of the field. <br /> It will be displayed above the
								field.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export const SubitleFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButton: {
		icon: Heading2,
		label: "Subtitle Field",
	},
	designerComponent: DesignerComponent,
	formComponent: FormComponent,
	propertiesComponent: PropertiesComponent,
	validate: () => true,
};
