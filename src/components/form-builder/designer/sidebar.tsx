import { useDesigner } from "./context";
import FormElementsSidebar from "./elements-sidebar";
import PropertiesFormSidebar from "./properties-sidebar";

export const DesignerSideBar = () => {
	const { selectedElement } = useDesigner();
	return (
		<aside className="bg-background w-100 flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bf-background overflow-y-auto h-full">
			{selectedElement ? <PropertiesFormSidebar /> : <FormElementsSidebar />}
		</aside>
	);
};
