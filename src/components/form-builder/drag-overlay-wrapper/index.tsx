import { SidebarDragOverlayButton } from "@/components/buttons/form-button/sidebar-drag-overlay";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { ElementsType, FormElements } from "../elements";
import { useDesigner } from "../designer/context";

export const DragOverlayWrapper = () => {
  const {elements} = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>()
  useDndMonitor({
    onDragStart: e => setDraggedItem(e.active),
    onDragCancel: e => setDraggedItem(null),
    onDragEnd: e => setDraggedItem(null),
  });
  let node = <div>No drag overlay</div>;
  if (!draggedItem) return null;

  const isSidebarButtonElement = draggedItem?.data?.current?.isDesignerButtonElement;
  
  if (isSidebarButtonElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarDragOverlayButton formElement={FormElements[type]}/>
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find(el => el.id === elementId);
    if (!element) node = <div>Element not found!</div>;
    else {
      const DesignerElementComponent = FormElements[element.type].designerComponent;
      node = <div className="flex bg-accent borer rounded-md h-30 w-full py-2 px-4 opacity-80 pointer pointer-events-none">
        <DesignerElementComponent elementInstance={element}/>
      </div>
    }
  }

  const type: ElementsType = draggedItem.data?.current?.type;
  if (isSidebarButtonElement) node = <SidebarDragOverlayButton formElement={FormElements[type]}/>;

  return (
    <DragOverlay>
      {node}
    </DragOverlay>
  )
}