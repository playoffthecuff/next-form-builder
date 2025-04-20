import { ReactNode } from "react";
import { TableCell } from "../ui/table";
import { ElementsType } from "./elements";
import { Badge } from "../ui/badge";
import { format } from "date-fns";

export default function RowCell({
	type,
	value,
}: { type: ElementsType; value: string }) {
	let node: ReactNode = value;

	// switch (type) {
	// 	case "DateField":
	// 		if (!value) break;
	// 		const d = new Date(value);
  //     node = <Badge variant={"outline"} >{format(d, "dd/MM/yyyy")}</Badge>
	// 		break;
  //   case "CheckBoxField":
  //     const checked = value;
  //     node = <Checkbox checked={checked} disabled/>;
  //     break;
	// 	default:
	// 		break;
	// }
	return <TableCell>{node}</TableCell>;
}
