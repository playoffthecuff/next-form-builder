"use client";

import { LetterText } from "lucide-react";
import { ElementsType, FormElement } from "..";

const type: ElementsType = "textField";

export const textFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes: {
			label: "Text field",
			helperText: "Helper text",
			required: false,
			placeHolder: "Value here ...",
		},
	}),
	designerButton: {
		icon: LetterText,
		label: "Text Field",
	},
	designerComponent: () => <div>Designer</div>,
	formComponent: () => <div>Form</div>,
	propertiesComponent: () => <div>Properties</div>,
};
