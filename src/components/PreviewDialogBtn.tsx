import React from "react";
import { Button } from "./ui/button";
import { IoMdEye } from "react-icons/io";
const PreviewDialogBtn = () => {
  return (
    <Button className="gap-4">
      <IoMdEye className="size-4" />
      Preview
    </Button>
  );
};

export default PreviewDialogBtn;
