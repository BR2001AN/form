"use server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { submissionSchema } from "./zodSchema";

export async function TalkToSalesAction(prevState:any, formData: FormData) {

    const submission = parseWithZod(formData, {
        schema: submissionSchema,
    })

    if (submission.status !== "success") {
        return submission.reply();
      }
    const response = await fetch(process.env.TALK_TO_SALES_URL!, {
        method: "POST",
        body: formData,
    })

    if (!response.ok) {
        throw new Error("Something went wrong")
    }

    return redirect("/success");
}