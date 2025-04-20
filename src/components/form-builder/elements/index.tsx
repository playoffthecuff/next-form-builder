import { DateFieldFormElement } from "./fields/date";
import { NumberFieldFormElement } from "./fields/number";
import { ParagraphFieldFormElement } from "./fields/paragraph";
import { SeparatorFieldFormElement } from "./fields/separator";
import { SpacerFieldFormElement } from "./fields/spacer";
import { SubitleFieldFormElement as SubtitleFieldFormElement } from "./fields/subtitle";
import { TextFieldFormElement } from "./fields/text";
import { TextAreaFieldFormElement } from "./fields/text-area";
import { TitleFieldFormElement } from "./fields/title";

export type ElementsType =
	| "textField"
	| "titleField"
	| "subtitleField"
	| "paragraphField"
	| "separatorField"
	| "spacerField"
	| "numberField"
	| "textAreaField"
	| "dateField";

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
	paragraphField: ParagraphFieldFormElement,
	separatorField: SeparatorFieldFormElement,
	spacerField: SpacerFieldFormElement,
	numberField: NumberFieldFormElement,
	textAreaField: TextAreaFieldFormElement,
	dateField: DateFieldFormElement,
};
