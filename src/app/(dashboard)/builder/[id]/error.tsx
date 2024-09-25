"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
      <h2 className="custom-gradient-error text-3xl font-bold">
        Something went wrong
      </h2>
      <Button>
        <Link href="/">Go to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
