"use client";
import { createForm } from "@/actions/form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSchema, formSchema } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@radix-ui/react-dialog";
import { LoaderCircle, Plus, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateFormButton() {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (v: FormSchema) => {
		try {
			const formId = await createForm(v);
			toast("Success", {
				description: "form created successfully"
			});
			console.log("🚀 ~ onSubmit ~ formId:", formId)
		} catch {
			toast("Error", {
				description: "Something went wrong, please try again later",
			});
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={"icon"}>
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Form</DialogTitle>
					<DialogDescription className="text-muted-foreground">
						Create a new form to start collecting responses
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea {...field} rows={5} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button
						onClick={form.handleSubmit(onSubmit)}
						disabled={form.formState.isSubmitting}
						className="mt-4"
						size={"icon"}
					>
						{!form.formState.isSubmitting && <Save />}
						{form.formState.isSubmitting && (
							<LoaderCircle className="animate-spin" />
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
