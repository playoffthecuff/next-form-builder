"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LinkShare({ shareUrl }: { shareUrl: string }) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	if (!mounted) return null;
	const shareLink = `${window.location.origin}/submit/${shareUrl}`;
	const handleClick = () => {
		navigator.clipboard.writeText(shareLink);
		toast("Copied", {
			description: "Link copied to clipboard",
		});
	};

	return (
		<div className="flex flex-grow gap-4 items-center">
			<Input value={shareLink} readOnly />
			<Button className="w-50" onClick={handleClick}>
				<Share2 />
				Share link
			</Button>
		</div>
	);
}
