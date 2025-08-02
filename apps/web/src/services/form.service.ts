import { Injectable, isDevMode } from "@angular/core";
import { FormApi, injectForm, injectStore } from "@tanstack/angular-form";
import { z } from "zod";


@Injectable({
 providedIn: "root",
})
export class FormService {
 injectZodForm<
   Schema extends z.Schema,
   Values extends z.infer<Schema>,
   >(schema: Schema, onSubmit: (values: Values) => void, defaultValues?: Values) : {
    form : FormApi<Values, any, any, any, any, any, any, any, any, any>,
    canSubmit : () => boolean,
    isSubmitting : () => boolean,
   } {
   const form = injectForm({
    defaultValues: defaultValues as Values,
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
    listeners: {
      onChange: ({ fieldApi, formApi }) => {
        if (isDevMode()) {
          console.log(fieldApi);
          console.log(formApi.getAllErrors())
        }
      }
    },
  });
  const canSubmit = injectStore(form, (state) => state.canSubmit);
  const isSubmitting = injectStore(form, (state) => state.isSubmitting);
  return {
    form : form as unknown as FormApi<Values, any, any, any, any, any, any, any, any, any>,
    canSubmit,
    isSubmitting,
  }
 }

}
