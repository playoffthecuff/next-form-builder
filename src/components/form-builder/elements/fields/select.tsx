"use client";

import { Button } from "@/components/ui/button";
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
import { Select, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@radix-ui/react-select";
import { PanelTopOpen, Plus, X } from "lucide-react";
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
import { toast } from "sonner";

const type: ElementsType = "selectField";

const extraAttributes = {
	label: "Select field",
	helperText: "Helper text",
	required: false,
	placeholder: "Value here ...",
	options: [],
};

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	helperText: z.string().max(200),
	required: z.boolean().default(false),
	placeholder: z.string().max(50),
	options: z.array(z.string()).default([]),
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

interface CustomInstance extends FormElementInstance {
	extraAttributes: typeof extraAttributes;
}

const DesignerComponent = ({
	elementInstance,
}: { elementInstance: FormElementInstance }) => {
	const element = elementInstance as CustomInstance;
	const { updateElement } = useDesigner();
	const { label, placeholder, required, helperText } = element.extraAttributes;
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label>
				{label}
				{required && "*"}
			</Label>
			<Select>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
			</Select>
			{helperText && (
				<p className="text-muted-foreground text-sm">{helperText}</p>
			)}
		</div>
	);
};

const FormComponent = ({
	elementInstance,
	submitValue,
	isInvalid,
}: {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
	isInvalid?: boolean;
}) => {
	const element = elementInstance as CustomInstance;
	const [value, setValue] = useState("");
	const [error, setError] = useState(false);
	useEffect(() => setError(!!isInvalid), [isInvalid]);
	const { label, placeholder, required, helperText, options } =
		element.extraAttributes;
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className={cn(error && "text-red-500")}>
				{label}
				{required && "*"}
			</Label>
			<Select
			defaultValue={value}
				onValueChange={(v) => {
					setValue(v);
					if (!submitValue) return;
					const isValid = SelectFieldFormElement.validate(element, v);
					setError(!isValid);
					submitValue(element.id, value);
				}}
			>
				<SelectTrigger className={cn("w-full", error && "border-red-500")}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((o) => (
						<SelectItem key={o} value={o}>
							{o}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
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
	);
};

const PropertiesComponent = ({
	elementInstance,
}: { elementInstance: FormElementInstance }) => {
	const element = elementInstance as CustomInstance;
	const { updateElement, setSelectedElement } = useDesigner();
	const form = useForm<PropertiesSchema>({
		resolver: zodResolver(propertiesSchema),
		mode: "onSubmit",
		defaultValues: {
			label: element.extraAttributes.label,
			helperText: element.extraAttributes.helperText,
			required: element.extraAttributes.required,
			placeholder: element.extraAttributes.placeholder,
			options: element.extraAttributes.options,
		},
	});
	useEffect(() => form.reset(element.extraAttributes), [element, form]);

	const applyChanges = (v: PropertiesSchema) => {
		const {
			label,
			helperText,
			placeholder: placeHolder,
			required,
			options,
		} = v;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				helperText,
				placeHolder,
				required,
				options,
			},
		});

		toast("Success", {
			description: "Properties saved successfully"
		});

		setSelectedElement(null);
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) =>
		e.preventDefault();

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Enter") e.currentTarget.blur();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(applyChanges)}
				className="space-y-3"
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
				>

				</FormField>
				<FormField
					control={form.control}
					name="placeholder"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Placeholder</FormLabel>
							<FormControl>
								<Input {...field} onKeyDown={handleKeyDown} />
							</FormControl>
							<FormDescription>The placeholder of the field.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				>
					
				</FormField>
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
				>

				</FormField>
				<Separator />
				<FormField
					control={form.control}
					name="options"
					render={({ field }) => (
						<FormItem>
							<div className="flex justify-between items-center">
								<FormLabel>Options</FormLabel>
								<Button
									variant="outline"
									className="gap-2"
									onClick={(e) => {
										e.preventDefault();
										form.setValue("options", field.value.concat("New option"));
									}}
								>
									<Plus />
									Add text
								</Button>
							</div>
							<div className="flex flex-col gap-2">
								{form.watch("options").map((v, i) => (
									<div
										key={i}
										className="flex items-center justify-between gap-1"
									>
										<Input
											placeholder=""
											value={v}
											onChange={(e) => {
												field.value[i] = e.target.value;
												field.onChange(field.value);
											}}
										/>
										<Button
											variant="ghost"
											size="icon"
											onClick={(e) => {
												e.preventDefault();
												const newOptions = [...field.value];
												newOptions.splice(i, 1);
												field.onChange(newOptions);
											}}
										>
											<X />
										</Button>
									</div>
								))}
							</div>
							<FormDescription>
								The helper text of the field. <br /> It will be displayed below
								the field.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				>

				</FormField>
				<Separator />
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
				>

				</FormField>
				<Separator />
				<Button className="w-full" type="submit">
					Save
				</Button>
			</form>
		</Form>
	);
};

export const SelectFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButton: {
		icon: PanelTopOpen,
		label: "Select Field",
	},
	designerComponent: DesignerComponent,
	formComponent: FormComponent,
	propertiesComponent: PropertiesComponent,
	validate: (fe: FormElementInstance, cv: string) =>
		fe.extraAttributes?.required ? cv.length > 0 : true,
};
