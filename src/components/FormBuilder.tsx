"use client";

import { Form } from "@prisma/client";
import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";

const FormBuilder = ({ form }: { form: Form }) => {
  return (
    <>
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
      </main>
    </>
  );
};

export default FormBuilder;
