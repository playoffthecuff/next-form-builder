import { SidebarButton } from "@/components/buttons/form-button/sidebar";
import { SidebarDragOverlayButton } from "@/components/buttons/form-button/sidebar-drag-overlay";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { ElementsType, FormElements } from "../elements";

export const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>()
  useDndMonitor({
    onDragStart: e => setDraggedItem(e.active),
    onDragCancel: e => setDraggedItem(null),
    onDragEnd: e => setDraggedItem(null),
  });
  let node = <div>No drag overlay</div>;
  if (!draggedItem) return null;
  const isSidebarButtonElement = draggedItem?.data?.current?.isDesignerButtonElement;
  console.log(draggedItem?.data?.current)
  const type: ElementsType = draggedItem.data?.current?.type;
  if (isSidebarButtonElement) node = <SidebarDragOverlayButton formElement={FormElements[type]}/>;

  return (
    <DragOverlay>
      {node}
    </DragOverlay>
  )
}