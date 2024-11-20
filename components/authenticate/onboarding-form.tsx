"use client";

import {
  UploadButton,
  UploadDropzone,
} from "@/app/api/uploadthing/uploadthing";
import { Session } from "next-auth";
import { Card } from "../ui/card";
import {
  Form,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { onboardingSchema } from "@/types/onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Image from "next/image";
import { useState } from "react";
import FromError from "./form-error";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { Onboarding } from "@/server/actions/onboarding";

type OnboardingFormProps = {
  session: Session;
};

const OnboardingForm = ({ session }: OnboardingFormProps) => {


    const router = useRouter();

  const [error, setError] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const user = session.user;
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      image: "",
      location: "",
    },
  });

  if(user?.image !== 'no-image'){
    redirect('/')
  }

  const {execute, status } = useAction(Onboarding, {
    onSuccess(data){
        setError(data.data?.error || '')
    }
  });

const onSubmit = (values: z.infer<typeof onboardingSchema>) => {
    execute(values)
    setError('')

    if(status === 'hasSucceeded'){
        router.replace('/')
    }
}


  return (
    <Card className="p-6">
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center flex-col items-center gap-2">
            <h1>Hey {user?.name}</h1>
            <span className="text-sm text-center flex justify-center mb-5">
              We need a little bit more information to get you started
            </span>
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please provide location:</FormLabel>
                <FormControl>
                  <Input placeholder="New York, NY" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload an image:</FormLabel>
                <div className="flex gap-4 sm:flex-row flex-col justify-center items-center">
                  {!form.getValues("image") && (
                    <Image
                      src="/fallbackimage.png"
                      alt="fallback image"
                      width={125}
                      height={125}
                      className="max-sm:mt-3 bg-tertiary"
                    />
                  )}
                  {form.getValues("image") && (
                    <Image
                      src={form.getValues("image")}
                      alt="uploaded image"
                      width={125}
                      height={125}
                      className="rounded-full"
                    />
                  )}
                  <UploadDropzone
                    endpoint="imageUploader"
                    onUploadBegin={() => {
                      setImageUploading(true);
                    }}
                    onUploadError={(error) => {
                      form.setError("image", {
                        type: "validate",
                        message: error.message,
                      });

                      return;
                    }}
                    onClientUploadComplete={(res) => {
                      form.setValue("image", res[0].url, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      setImageUploading(false);
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FromError message={error} />

          <Button
            type="submit"
            className="w-full"
            disabled={status === "executing"}
          >
            {status === "executing" ? "Loading..." : "Go to Dashboard"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default OnboardingForm;
