"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner3 } from "react-icons/im";
import { formSchema, formSchemaType } from "../../schemas/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CreateForm } from "../../actions/forms";
import { BsFileEarmarkPlus } from "react-icons/bs";

const CreateFormBtn = () => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: formSchemaType) {
    try {
      const formId = await CreateForm(values);
      console.log(formId);
      toast({
        title: "Success",
        description: `Form: ${values.name}  is created`,
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "something went wrong",
        variant: "destructive",
        duration: 1000,
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group border border-primary/20 h-[120px] flex flex-col justify-center items-center cursor-pointer hover:border-primary border-dashed gap-4 "
        >
          <BsFileEarmarkPlus className=" h-7 w-7 text-muted-foreground group-hover:text-primary" />
          <p className="font-semibold text-xl group-hover:text-primary">
            Create new Form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button className="w-full mt-4" onClick={form.handleSubmit(onSubmit)}>
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && (
              <ImSpinner3 className="animate-spin size-4" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormBtn;
