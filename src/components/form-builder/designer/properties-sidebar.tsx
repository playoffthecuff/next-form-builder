import { Button } from "@/components/ui/button";
import { X } from "lucide-react"
import { FormElements } from "../elements";
import { useDesigner } from "./context";
import { Separator } from "@/components/ui/separator";

export default function PropertiesFormSidebar() {
	const { selectedElement, setSelectedElement } = useDesigner();
	if (!selectedElement?.type) return null;
	const PropertiesForm =
		FormElements[selectedElement?.type].propertiesComponent;

    const handleClick = () => setSelectedElement(null);

	return <div className="flex flex-col p-2">
    <div className="flex justify-between items-center">
      <p className="text-sm text-foreground/70">Element properties</p>
      <Button size={"icon"} variant={"ghost"} onClick={handleClick}>
        <X/>
      </Button>
    </div>
    <Separator className="mb-4"/>
    <PropertiesForm elementInstance={selectedElement}/>
  </div>;
}
