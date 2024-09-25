import React from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";

const PublishFormBtn = () => {
  return (
    <Button className="gap-4 bg-gradient-to-r to-blue-500 from-fuchsia-500 text-white font-semibold">
      <MdOutlinePublish className="size-4" />
      Publish
    </Button>
  );
};

export default PublishFormBtn;
