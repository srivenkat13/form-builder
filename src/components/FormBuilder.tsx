"use client";

import { Form } from "@prisma/client";
import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";
import Desginer from "./Desginer";
import { DndContext } from "@dnd-kit/core";

const FormBuilder = ({ form }: { form: Form }) => {
  return (
    <>
      <DndContext>
        <main className="flex flex-col w-full">
          <nav className="flex flex-col md:flex-row justify-between items-center border-b-2 p-3 gap-4">
            <h2 className=" truncate font-medium">
              <span className="text-muted-foreground mr-2">Form:</span>
              {form.name}
            </h2>
            <div className="flex items-center gap-2">
              <PreviewDialogBtn />
              {!form.published && (
                <>
                  <SaveFormBtn />
                  <PublishFormBtn />
                </>
              )}
            </div>
          </nav>
          <div className="flex items-center justify-center w-full h-[200px] flex-grow relative overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
            <Desginer />
          </div>
        </main>
      </DndContext>
    </>
  );
};

export default FormBuilder;
