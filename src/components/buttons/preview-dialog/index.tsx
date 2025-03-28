import { useDesigner } from "@/components/form-builder/designer/context";
import { FormElements } from "@/components/form-builder/elements";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Eye } from "lucide-react";

function PreviewDialogButton() {
	const { elements } = useDesigner();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"outline"} className="gap-2">
					<Eye className="h-6 w-6" />
					Preview
				</Button>
			</DialogTrigger>
			<DialogContent className="w-screen h-screen max-w-screen flex flex-col flex-grow p-0 gap-0">
				<div className="px-4 py-2 border-b">
					<p className="text-lg font-bold text-muted-foreground">
						Form Preview
					</p>
					<p className="text-sm text-muted-foreground">
						This is how your form will look like your users.
					</p>
				</div>
				<div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)] overflow-y-auto">
					<div className="max-w-152 flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
						{elements.map((el) => {
							const FormComponent = FormElements[el.type].formComponent;
							return <FormComponent key={el.id} elementInstance={el}/>;
						})}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
export default PreviewDialogButton;
