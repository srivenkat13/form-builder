import Loading from "./loading";
import ErrorPage from "./error";
import { GetFormById } from "../../../../../actions/forms";
import FormBuilder from "@/components/FormBuilder";

async function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error("Form not found");
  }
  return <FormBuilder form={form} />;
}

export default BuilderPage;
