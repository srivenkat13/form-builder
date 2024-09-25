import React from "react";
import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";

const SaveFormBtn = () => {
  return (
    <Button className="gap-4">
      <HiSaveAs className="size-4" />
      Save
    </Button>
  );
};

export default SaveFormBtn;
