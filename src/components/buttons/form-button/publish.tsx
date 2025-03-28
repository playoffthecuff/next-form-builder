import { publishForm } from "@/actions/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BookPlus, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler, startTransition, useState, useTransition } from "react";
import { toast } from "sonner";

export const PublishFormButton = ({id}: {id: number}) => {
	const [loading, startTransition] = useTransition();
	const router = useRouter();

	async function pubForm() {
		try {
			await publishForm(id);
			toast("Success", {
				description: "Your form is now public available"
			});
			router.refresh();
		} catch (e) {
			toast.error("Error", {
				description: "Something went wrong",
			});
		}
	}
	
	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
			e.preventDefault();
			startTransition(pubForm)
	}
	return (
		<AlertDialog>

			<AlertDialogTrigger asChild>
				<Button variant={"outline"} className="text-white bg-gradient-to-r from-indigo-500 to-cyan-700">
					<BookPlus className="w-4 h-4"/>
					Publish
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
							This action can not been undone. After publishing you will not be able to edit this form.<br/><br/>
							<span className="font-medium">
								By publishing this form you will make it available to the public and you will be able to collect submissions.
							</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction disabled={loading} onClick={handleClick}>
						Proceed {loading && <LoaderCircle className="animate-spin"/>}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
