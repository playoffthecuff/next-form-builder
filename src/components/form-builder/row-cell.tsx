import { format } from "date-fns";
import { ReactNode } from "react";
import { Badge } from "../ui/badge";
import { TableCell } from "../ui/table";
import { ElementsType } from "./elements";
import { Checkbox } from "../ui/checkbox";

export default function RowCell({
	type,
	value,
}: { type: ElementsType; value: string }) {
	let node: ReactNode = value;
	switch (type) {
		case "dateField": {
			if (!value) break;
			const date = new Date(value);
			node = <Badge variant="outline">{format(date, "dd/MM/yyyy")}</Badge>;
			break;
		}
			case "checkboxField": {
				const checked = value === "true";
				node = <Checkbox checked={checked} disabled />
				break;
			}
		}
	return <TableCell>{node}</TableCell>;
}
