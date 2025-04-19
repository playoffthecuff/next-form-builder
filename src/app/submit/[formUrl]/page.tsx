import { getFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/form-builder/elements";
import FormSubmit from "@/components/form-builder/submit";

export default async function Page({params}: {params: {
  formUrl: string
}}) {
  const {formUrl} = await params;
  const form = await getFormContentByUrl(formUrl);
  if (!form) throw new Error("form not found");
  const formContent = JSON.parse(form.content) as FormElementInstance[];
  return (
    <FormSubmit formUrl={formUrl} content={formContent}/>
  )
}