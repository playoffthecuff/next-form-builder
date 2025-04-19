"use client";

import { Button } from "@/components/ui/button";
import { Loader, SendHorizonal } from "lucide-react";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { FormElementInstance, FormElements } from "../elements";
import { SubmitForm } from "@/actions/form";

export default function FormSubmit({
	formUrl,
	content,
}: { formUrl: string; content: FormElementInstance[] }) {
	const formValues = useRef<Record<string, string>>({});
	const formErrors = useRef<Record<string, boolean>>({});
	const [renderKey, setRenderKey] = useState(Date.now());
	const [submitted, setSubmitted] = useState(false);
	const [pending, startTransition] = useTransition();

	const validateForm = useCallback(() => {
		for (const field of content) {
			const actualValue = formValues.current[field.id] ?? "";
			console.log(FormElements[field.type]);
			const isValid = FormElements[field.type].validate(field, actualValue);
			if (!isValid) formErrors.current[field.id] = true;
			if (Object.keys(formErrors.current).length) return false;
			return true;
		}
	}, [content]);

	const submitValue = useCallback((key: string, value: string) => {
		formValues.current[key] = value;
	}, []);
	const submitForm = async () => {
		formErrors.current = {};
		const isValid = validateForm();
		console.log(isValid)
		if (!isValid) {
			setRenderKey(Date.now());
			toast("Error", {
				description: "please check the form for errors",
			});
			return;
		}
		try {
			const content = JSON.stringify(formValues.current);
			await SubmitForm(formUrl, content);
			setSubmitted(true);
		} catch (error) {
			toast("Error", {
				description: "Something went wrong",
			});
		}

		console.log("FORM VALUES", formValues.current);
	};

	if (submitted) return (
		<div className="flex justify-center w-full h-full items-center p-8">
			<div className="max-w-120 flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
				<h1 className="text=2xl font-bold">Form submitted</h1>
				<p className="text-muted-foreground">Thank you for submitting the form, you can close this page now.</p>
			</div>
		</div>
	)

	return (
		<div className="flex justify-center w-full h-full items-center p-8">
			<div
				key={renderKey}
				className="max-w-120 flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
			>
				{content.map((el) => {
					const Fe = FormElements[el.type].formComponent;
					return (
						<Fe
							key={el.id}
							elementInstance={el}
							submitValue={submitValue}
							isInvalid={formErrors.current[el.id]}
							defaultValue={formValues.current[el.id]}
						/>
					);
				})}
				<Button
					className="mt-8"
					onClick={() => startTransition(submitForm)}
					disabled={pending}
				>
					{!pending ? (
						<>
							Submit
							<SendHorizonal className="mr-2" />
						</>
					) : (
						<Loader className="animate-spin" />
					)}
				</Button>
			</div>
		</div>
	);
}
