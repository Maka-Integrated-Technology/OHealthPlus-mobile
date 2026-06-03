import { z } from "zod";

/**
 * Bridges a Zod schema into a Formik `validate` function.
 * Usage:
 *   const formik = useFormik({ validate: toFormikValidate(mySchema), ... })
 */
export function toFormikValidate<T>(schema: z.ZodType<T>) {
  return (values: T): Record<string, string> => {
    const result = schema.safeParse(values);
    if (result.success) return {};

    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      if (path && !errors[path]) {
        errors[path] = issue.message;
      }
    });
    return errors;
  };
}
