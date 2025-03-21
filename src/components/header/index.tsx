import { UserButton } from "@clerk/nextjs";
import Logo from "./children/logo";
import { ModeToggle } from "./children/mode-toggle";

export default function Header() {
	return (
		<header className="flex gap-4 w-full">
			<div className="max-w-7xl w-full flex justify-between py-2 px-4">
				<Logo />
				<nav className="flex gap-4 items-center">
					<UserButton />
					<ModeToggle />
				</nav>
			</div>
		</header>
	);
}
