"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function VisitButton({ shareUrl }: { shareUrl: string }) {
	const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
	if (!mounted) return null;
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
	const handleClick = () => window.open(shareLink, "_blank");

	return (
		<Button className="w-50" onClick={handleClick}>
			Visit
		</Button>
	);
}
