"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquareCheck } from "lucide-react";
import {
	FormEventHandler,
	KeyboardEventHandler,
	useEffect,
	useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	ElementsType,
	FormElement,
	FormElementInstance,
	SubmitFunction,
} from "..";
import { useDesigner } from "../../designer/context";

const type: ElementsType = "checkboxField";

const extraAttributes = {
	label: "Checkbox field",
	helperText: "Helper text",
	required: false,
};

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	helperText: z.string().max(200),
	required: z.boolean().default(false),
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

interface CustomInstance extends FormElementInstance {
	extraAttributes: typeof extraAttributes;
}

const DesignerComponent = ({
	elementInstance,
}: { elementInstance: FormElementInstance }) => {
	const element = elementInstance as CustomInstance;
	const { label, required, helperText } = element.extraAttributes;
	const id = `checkbox-${element.id}`;
	return (
		<div className="flex items-top space-x-2">
			<Checkbox id={id} />
			<div className="grid  gap-1.5 leading-none">
				<Label htmlFor={id}>
					{label}
					{required && "*"}
				</Label>
				{helperText && (
					<p className="text-muted-foreground text-sm">{helperText}</p>
				)}
			</div>
		</div>
	);
};

const FormComponent = ({
	elementInstance,
	submitValue,
	isInvalid,
	defaultValue,
}: {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
	isInvalid?: boolean;
	defaultValue?: string;
}) => {
	const element = elementInstance as CustomInstance;
	const [value, setValue] = useState(defaultValue === "true");
	const [error, setError] = useState(false);
	useEffect(() => setError(!!isInvalid), [isInvalid]);
	const { label, required, helperText } = element.extraAttributes;
	const id = `checkbox-${element.id}`;

	return (
		<div className="flex items-top space-x-2">
			<Checkbox
				id={id}
				checked={value}
				className={cn(error && "border-red-500")}
				onCheckedChange={(c) => {
					let v = false;
					if (c) v = true;
					setValue(v);
					if (!submitValue) return;
					const strV = v ? "true" : "false";
					const isValid = CheckboxFieldFormElement.validate(element, strV);
					setError(!isValid);
					submitValue(element.id, strV);
				}}
			/>

			<div className="grid  gap-1.5 leading-none">
				<Label htmlFor={id} className={cn(error && "text-red-500")}>
					{label}
					{required && "*"}
				</Label>
				{helperText && (
					<p
						className={cn(
							"text-muted-foreground text-sm",
							error && "text-red-500",
						)}
					>
						{helperText}
					</p>
				)}
			</div>
		</div>
	);
};

const PropertiesComponent = ({
	elementInstance,
}: { elementInstance: FormElementInstance }) => {
	const element = elementInstance as CustomInstance;
	const { updateElement } = useDesigner();
	const form = useForm<PropertiesSchema>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			label: element.extraAttributes.label,
			helperText: element.extraAttributes.helperText,
			required: element.extraAttributes.required,
		},
	});
	useEffect(() => form.reset(element.extraAttributes), [element, form]);

	const applyChanges = (v: PropertiesSchema) => {
		const { label, helperText, required } = v;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				helperText,
				required,
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
					name="label"
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
				></FormField>
				<FormField
					control={form.control}
					name="helperText"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Helper text</FormLabel>
							<FormControl>
								<Input {...field} onKeyDown={handleKeyDown} />
							</FormControl>
							<FormDescription>
								The helper text of the field. <br /> It will be displayed below
								the field.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
				<FormField
					control={form.control}
					name="required"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
							<div className="space-y-0.5">
								<FormLabel>Required</FormLabel>
								<FormDescription>
									The helper text of the field. <br /> It will be displayed
									below the field.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
			</form>
		</Form>
	);
};

export const CheckboxFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButton: {
		icon: SquareCheck,
		label: "Checkbox Field",
	},
	designerComponent: DesignerComponent,
	formComponent: FormComponent,
	propertiesComponent: PropertiesComponent,
	validate: (fe: FormElementInstance, cv: string) => {
		if (fe.extraAttributes?.required) return cv === "true";
		return true;
	},
};
