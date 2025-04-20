import { getSubmittedForm } from "@/actions/form";
import { formatDistance } from "date-fns";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { ElementsType, FormElementInstance } from "./elements";
import RowCell from "./row-cell";

type Row = Record<string, string> & { submittedAt: Date };

export default async function SubmissionsTable({ id }: { id: number }) {
	const form = await getSubmittedForm(id);
	if (!form) throw new Error("form not found");

	const formElements = JSON.parse(form.content) as FormElementInstance[];
	const columns: {
		id: string;
		label: string;
		required: boolean;
		type: ElementsType;
	}[] = [];
	// biome-ignore lint/complexity/noForEach: <explanation>
	formElements.forEach((el) => {
		switch (el.type) {
			case "textField":
				columns.push({
					id: el.id,
					label: el.extraAttributes?.label,
					required: el.extraAttributes?.required,
					type: el.type,
				});
				break;
			default:
				break;
		}
	});

	const rows: Row[] = [];
	// biome-ignore lint/complexity/noForEach: <explanation>
	form.FormSubmissions.forEach((s) => {
		const content = JSON.parse(s.content);
		rows.push({
			...content,
			submittedAt: s.createdAt,
		});
	});

	return (
		<>
			<h1 className="text-2xl font-bold my-4">Submissions</h1>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((c) => (
								<TableHead key={c.id} className="uppercase">
									{c.label}
								</TableHead>
							))}
							<TableHead className="text-muted-foreground text-right uppercase">
								Submitted at
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((r, i) => (
							<TableRow key={i}>
								{columns.map((c) => (
									<RowCell key={c.id} type={c.type} value={c.id} />
								))}
								<TableCell className="text-muted-foreground text-right">
									{formatDistance(r.submittedAt, new Date(), {
										addSuffix: true,
									})}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
