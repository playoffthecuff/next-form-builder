import { SubitleFieldFormElement as SubtitleFieldFormElement } from "./fields/subtitle";
import { textFieldFormElement as TextFieldFormElement } from "./fields/text";
import { TitleFieldFormElement } from "./fields/title";

export type ElementsType = "textField" | "titleField" | "subtitleField";

export interface FormElementInstance {
	id: string;
	type: ElementsType;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	extraAttributes?: Record<string, any>;
}

export type SubmitFunction = (key: string, value: string) => void;

export interface FormElement {
	type: ElementsType;

	construct: (id: string) => FormElementInstance;

	designerButton: {
		icon: React.ElementType;
		label: string;
	};

	designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
	formComponent: React.FC<{
		elementInstance: FormElementInstance;
		submitValue?: SubmitFunction;
		isInvalid?: boolean;
		defaultValue?: string;
	}>;
	propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>;

	validate: (fe: FormElementInstance, cv: string) => boolean;
}

export type FormElementsType = {
	[key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
	textField: TextFieldFormElement,
	titleField: TitleFieldFormElement,
	subtitleField: SubtitleFieldFormElement,
};
