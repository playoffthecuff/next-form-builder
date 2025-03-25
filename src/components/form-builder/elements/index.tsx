import { textFieldFormElement } from "./fields/text";

export type ElementsType = "textField";

export type FormElementInstance = {
	id: string;
	type: ElementsType;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	extraAttributes?: Record<string, any>;
};

export type FormElement = {
	type: ElementsType;

	construct: (id: string) => FormElementInstance;

	designerButton: {
		icon: React.ElementType;
		label: string;
	};

	designerComponent: React.FC;
	formComponent: React.FC;
	propertiesComponent: React.FC;
};

export type FormElementsType = {
	[key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
	textField: textFieldFormElement,
};
