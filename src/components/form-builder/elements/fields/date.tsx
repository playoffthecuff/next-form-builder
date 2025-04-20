"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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

const type: ElementsType = "dateField";

const extraAttributes = {
	label: "Date field",
	helperText: "Pick a date",
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
	const { updateElement } = useDesigner();
	const { label, required, helperText } = element.extraAttributes;
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label>
				{label}
				{required && "*"}
			</Label>
			<Button
				variant={"outline"}
				className="w-full justify-start text-left font-normal"
			>
				<CalendarIcon className="mr-2 h-4 w-4" />
				<span>Pick a date</span>
			</Button>
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
	defaultValue,
}: {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
	isInvalid?: boolean;
	defaultValue?: string;
}) => {
	const element = elementInstance as CustomInstance;
	const [date, setDate] = useState<Date | undefined>(
		defaultValue ? new Date(defaultValue) : undefined,
	);
	const [error, setError] = useState(false);
	const { updateElement } = useDesigner();
	useEffect(() => setError(!!isInvalid), [isInvalid]);
	const { label, required, helperText } = element.extraAttributes;
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className={cn(error && "text-red-500")}>
				{label}
				{required && "*"}
			</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						className={cn(
							"w-full justify-start text-left font-normal",
							!date && "text-muted-foreground",
							error && "border-red-500",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? format(date, "PPP") : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(date) => {
							setDate(date);
							if (!submitValue) return;
							const v = date?.toUTCString() ?? "";
							const isValid = DateFieldFormElement.validate(element, v);
							setError(!isValid);
							submitValue(element.id, v);
						}}
						initialFocus
					>

					</Calendar>
				</PopoverContent>
			</Popover>
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

export const DateFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerButton: {
		icon: CalendarIcon,
		label: "Date Field",
	},
	designerComponent: DesignerComponent,
	formComponent: FormComponent,
	propertiesComponent: PropertiesComponent,
	validate: (fe: FormElementInstance, cv: string) =>
		fe.extraAttributes?.required ? cv.length > 0 : true,
};
