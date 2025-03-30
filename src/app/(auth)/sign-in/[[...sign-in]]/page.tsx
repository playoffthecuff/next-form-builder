import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="w-full h-full flex justify-center my-auto">
			<SignIn />
		</div>
	);
}
