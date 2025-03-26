"use client";

import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LetterText } from "lucide-react";
import { ElementsType, FormElement, FormElementInstance } from "..";

const type: ElementsType = "textField";

const extraAttributes = {
	label: "Text field",
	helperText: "Helper text",
	required: false,
	placeHolder: "Value here ...",
};

interface CustomInstance extends FormElementInstance {
	extraAttributes: typeof extraAttributes;
}

const DesignerComponent = ({
	elementInstance,
}: { elementInstance: FormElementInstance }) => {
	const element = elementInstance as CustomInstance;
	const {label, placeHolder, required, helperText	} = element.extraAttributes;
	return (
	<div className="flex flex-col gap-2 w-full">
		<Label>{label}
			{required && "*"}
		</Label>
		<Input readOnly disabled placeholder={placeHolder}/>
		{helperText && <p className="text-muted-foreground text-sm">{helperText}</p>}
	</div>
)};

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
	propertiesComponent: () => <div>Properties</div>,
};
