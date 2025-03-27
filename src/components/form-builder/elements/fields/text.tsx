"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { LetterText } from "lucide-react";
import { FormEventHandler, KeyboardEventHandler, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ElementsType, FormElement, FormElementInstance } from "..";
import { useDesigner } from "../../designer/context";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";


const type: ElementsType = "textField";

const extraAttributes = {
	label: "Text field",
	helperText: "Helper text",
	required: false,
	placeHolder: "Value here ...",
};

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	helperText: z.string().max(200),
	required: z.boolean().default(false),
	placeHolder: z.string().max(50),
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

interface CustomInstance extends FormElementInstance {
	extraAttributes: typeof extraAttributes;
}

const PropertiesComponent = ({
	elementInstance,
}: { elementInstance: FormElementInstance }) => {
	const element = elementInstance as CustomInstance;
	const {updateElement} = useDesigner();
	const form = useForm<PropertiesSchema>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			label: element.extraAttributes.label,
			helperText: element.extraAttributes.helperText,
			required: element.extraAttributes.required,
			placeHolder: element.extraAttributes.placeHolder,
		}
	})
	useEffect(() => form.reset(element.extraAttributes), [element, form]);

	const applyChanges = (v: PropertiesSchema) => {
		const {label, helperText, placeHolder, required} = v;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				helperText,
				placeHolder,
				required,
			}
		})
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = e => e.preventDefault();

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Enter") e.currentTarget.blur();
	}

	return (<Form {...form}>
		<form onBlur={form.handleSubmit(applyChanges)} className="space-y-3" onSubmit={handleSubmit}>
		<FormField control={form.control} name="label" render={({field}) => (
			<FormItem>
				<FormLabel>
					Label
				</FormLabel>
				<FormControl>
					<Input {...field} onKeyDown={handleKeyDown}/>
				</FormControl>
				<FormDescription>
					The label of the field. <br/> It will be displayed above the field.
				</FormDescription>
				<FormMessage/>
			</FormItem>
		) }>
		</FormField>
		<FormField control={form.control} name="placeHolder" render={({field}) => (
			<FormItem>
				<FormLabel>
					Placeholder
				</FormLabel>
				<FormControl>
					<Input {...field} onKeyDown={handleKeyDown}/>
				</FormControl>
				<FormDescription>
					The placeholder of the field.
				</FormDescription>
				<FormMessage/>
			</FormItem>
		) }>
		</FormField>
		<FormField control={form.control} name="helperText" render={({field}) => (
			<FormItem>
				<FormLabel>
					Helper text
				</FormLabel>
				<FormControl>
					<Input {...field} onKeyDown={handleKeyDown}/>
				</FormControl>
				<FormDescription>
					The helper text of the field. <br/> It will be displayed below the field.
				</FormDescription>
				<FormMessage/>
			</FormItem>
		) }>
		</FormField>
		<FormField control={form.control} name="required" render={({field}) => (
			<FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
				<div className="space-y-0.5">
					<FormLabel>
					Required
				</FormLabel>
				<FormDescription>
					The helper text of the field. <br/> It will be displayed below the field.
				</FormDescription></div>
				<FormControl>
					<Switch checked={field.value} onCheckedChange={field.onChange}/>
				</FormControl>
				<FormMessage/>
			</FormItem>
		) }>
		</FormField>
		</form>
	</Form>);
};


const DesignerComponent = ({
	elementInstance,
}: { elementInstance: FormElementInstance }) => {
	const element = elementInstance as CustomInstance;
	const {updateElement} = useDesigner();
	const { label, placeHolder, required, helperText } = element.extraAttributes;
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label>
				{label}
				{required && "*"}
			</Label>
			<Input readOnly disabled placeholder={placeHolder} />
			{helperText && (
				<p className="text-muted-foreground text-sm">{helperText}</p>
			)}
		</div>
	);
};

export const textFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButton: {
		icon: LetterText,
		label: "Text Field",
	},
	designerComponent: DesignerComponent,
	formComponent: () => <div>Form</div>,
	propertiesComponent: PropertiesComponent,
};
