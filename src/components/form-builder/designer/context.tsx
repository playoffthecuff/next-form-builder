"use client";

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { FormElementInstance } from "../elements";

interface DesignerContext {
	elements: FormElementInstance[];
	addElement: (i: number, el: FormElementInstance) => void;
	removeElement: (id: string) => void;

	selectedElement: FormElementInstance | null;
	setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;

	updateElement: (id: string, element: FormElementInstance) => void;
}

export const DesignerContext = createContext<DesignerContext | null>(null);

export function DesignerContextProvider({ children }: { children: ReactNode }) {
	const [elements, setElements] = useState<FormElementInstance[]>([]);
	const [selectedElement, setSelectedElement] =
		useState<FormElementInstance | null>(null);
	const addElement = (i: number, el: FormElementInstance) =>
		setElements((p) => {
			const newEls = [...p];
			newEls.splice(i, 0, el);
			return newEls;
		});

	const removeElement = (id: string) => {
		setElements((p) => p.filter((el) => el.id !== id));
	};

	const updateElement = (id: string, element: FormElementInstance) => {
		setElements((p) => {
			const newElements = [...p];
			const index = newElements.findIndex((el) => el.id === id);
			newElements[index] = element;
			return newElements;
		});
	};

	return (
		<DesignerContext.Provider
			value={{
				elements,
				addElement,
				removeElement,
				selectedElement,
				setSelectedElement,
				updateElement,
			}}
		>
			{children}
		</DesignerContext.Provider>
	);
}

export function useDesigner() {
	const context = useContext(DesignerContext);

	if (!context) throw new Error("must be used within a context");
	return context;
}
