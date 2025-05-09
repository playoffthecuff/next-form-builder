import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Check, Eye } from "lucide-react";
import Link from "next/link";

export default function FormCard({ form }: { form: Form }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-x-2 justify-between">
					<span className="truncate font-bold">{form.name}</span>
					{form.published ? (
						<Badge>Published</Badge>
					) : (
						<Badge variant={"destructive"}>Draft</Badge>
					)}
				</CardTitle>
				<CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
					{formatDistance(form.createdAt, new Date(), { addSuffix: true })}
					{form.published && (
						<span className="flex items-center gap-x-2">
							<Eye className="text-muted-foreground" />
							<span>{form.visits.toLocaleString()}</span>
							<Check className="text-muted-foreground" />
							<span>{form.submissions.toLocaleString()}</span>
						</span>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent className="h-5 truncate text-sm text-muted-foreground">
				{form.description && "No description"}
			</CardContent>
			<CardFooter>
				{form.published && (
					<Button asChild className="w-full mt-2 text-md gap-4">
						<Link href={`/forms/${form.id}`}>
							View submissions
							<Eye />
						</Link>
					</Button>
				)}
				{!form.published && (
					<Button asChild className="w-full mt-2 text-md gap-4" variant={"outline"}>
						<Link href={`/builder/${form.id}`}>
							Edit form
							<Eye />
						</Link>
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}
