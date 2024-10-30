"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Tabs,  TabsContent,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TalkToSalesAction } from "./action";
import { SubmitButton } from "./components/SubmitButton";
import { useForm } from "@conform-to/react";
import { useFormState } from "react-dom";
import { parseWithZod } from "@conform-to/zod";
import { submissionSchema } from "./zodSchema";




export default function Home() {
  const [salesResult, salesAction] = useFormState (TalkToSalesAction, undefined);

  const [salesForm, salesFields] = useForm({
    lastResult: salesResult,

    onValidate({formData}) {
      return parseWithZod(formData, {schema: submissionSchema})
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  })
  return (
    <section className="min-h-screen w-screen flex flex-col items-center justify-center px-5">
     <h1 className="text-4xl font-bold mb-7">Contact us</h1>
     <Card className="max-w-[500px] w-full">
      <Tabs defaultValue="sales">
        <CardContent className="mt-5">
          <TabsList className="grid grid-cols-2">
               <TabsTrigger value="sales">Talk to Sales</TabsTrigger>
               <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="sales">
             <p className="text-muted-foreground text-sm">
              you want to intergrate your product with us? we can help. please contact us down below
            </p>

            
            <form
            action={salesAction}
            id={salesForm.id}
            onSubmit={salesForm.onSubmit}
            noValidate
            className="flex flex-col gap-y-4 mt-5">
            <input type="hidden" name="_gotcha" /> 

              <div className="grid space-y-1">
            <Label>Name</Label>
            <Input name={salesFields.name.name} defaultValue={salesFields.name.initialValue} placeholder="John Doe"/>
            <p className="text-red-500 text-sm">{salesFields.name.errors}</p>
              </div>
              <div className="grid space-y-1">
                <Label>Email</Label>
                <Input name={salesFields.email.name} defaultValue={salesFields.email.initialValue} placeholder="john.doe@example.com"/>
              </div>
              <p className="text-red-500 text-sm">{salesFields.email.errors}</p>
              <div className="grid space-y-1">
                <Label>Question or Problem</Label>
                <Textarea className="h-32" placeholder="please describe your question or problem...." name={salesFields.message.name} key={salesFields.message.key} defaultValue={salesFields.message.initialValue}/>
                <p className="text-red-500 text-sm">{salesFields.message.errors}</p>
              </div>
              <SubmitButton/>
            </form>
          </TabsContent>

          <TabsContent value="support">
          <p className="text-muted-foreground text-sm">
              Troubleshoot a technical issue or payment problem
            </p>
            <form className="flex flex-col gap-y-4 mt-5"> 
            <input type="hidden" name="_gotcha"/> 
              <div className="grid space-y-1">
                <Label>Name</Label>
                <Input placeholder="John Doe"/>
              </div>
              <div className="grid space-y-1">
              <Label>Email</Label>
              <Input placeholder="john.doe@example.com"/>
              </div>
              <div className="grid space-y-1">
                <Label>Problem</Label>
                <Textarea className="h-32" placeholder="What is wrong?..."/>
              </div>
              <div className="grid space-y-1">
                <Label>Asset</Label>
                <Input type="file"/>
              </div>
              <SubmitButton/>
            </form>
          </TabsContent>
        </CardContent>
      </Tabs>
     </Card>
    </section>
  );
}
