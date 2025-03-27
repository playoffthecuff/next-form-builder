import { textFieldFormElement } from "./fields/text";

export type ElementsType = "textField";

export interface FormElementInstance {
	id: string;
	type: ElementsType;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	extraAttributes?: Record<string, any>;
};

export interface FormElement {
	type: ElementsType;

	construct: (id: string) => FormElementInstance;

	designerButton: {
		icon: React.ElementType;
		label: string;
	};

	designerComponent: React.FC<{elementInstance: FormElementInstance}>;
	formComponent: React.FC<{elementInstance: FormElementInstance}>;
	propertiesComponent: React.FC<{elementInstance: FormElementInstance}>;
};

export type FormElementsType = {
	[key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
	textField: textFieldFormElement,
};
