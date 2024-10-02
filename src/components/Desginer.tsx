import React from "react";
import DesginerSidebar from "./DesginerSidebar";
import { useDroppable } from "@dnd-kit/core";

const Desginer = () => {
  const droppable = useDroppable({
    id: "desginer-drop-area",
    data: {
      isDesginerDropArea: true,
    },
  });
  return (
    <div className="w-full h-full flex ">
      <div className="p-4 w-full">
        <div className="bg-gray-500 dark:bg-gray-950 max-w-screen-xl h-full m-auto flex flex-col items-center justify-start flex-1 flex-grow overflow-y-auto rounded-xl cursor-cell ">
          <p className="text-3xl text-muted dark:text-muted-foreground flex flex-grow items-center font-bold opacity-70 hover:opacity-100">
            Drop here
          </p>
        </div>
      </div>
      <DesginerSidebar />
    </div>
  );
};

export default Desginer;
