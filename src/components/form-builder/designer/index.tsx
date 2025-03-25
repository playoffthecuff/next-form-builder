"use client";

import { DesignerSideBar } from "./sidebar";

export const Designer = () => {
	return (
		<div className="flex w-full h-full">
			<div className="p-4 w-full ">
				<div className="bg-background max-w-5xl h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto">
					<p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
						Drop here
					</p>
				</div>
			</div>
			<DesignerSideBar/>
		</div>
	);
};
