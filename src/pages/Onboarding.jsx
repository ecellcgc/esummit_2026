import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import bgImage from "@/assets/bgimage.png";
import { submitOnboarding, getMe } from "@/lib/api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const onboardingSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    organization: z.string().min(1, "Organization is required"),
    city: z.string().min(1, "City is required"),
    mobile: z.string().min(10, "Enter a valid mobile number").max(15, "Mobile number is too long"),
    isFromCgc: z.boolean(),
    rollNumber: z.string().optional(),
    college: z.string().optional(),
    branch: z.string().optional(),
    section: z.string().optional(),
    semester: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.isFromCgc) return true;
      return (
        !!data.rollNumber?.trim() &&
        !!data.college?.trim() &&
        !!data.branch?.trim() &&
        !!data.section?.trim() &&
        !!data.semester?.trim()
      );
    },
    { message: "When from CGC, all college fields are required", path: ["rollNumber"] }
  );

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-['Space_Grotesk',sans-serif] text-base transition-all duration-300 focus:outline-none focus:border-purple-500 focus:bg-purple-500/5 focus:ring-4 focus:ring-purple-500/10 placeholder:text-zinc-500";

function Onboarding() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getMe()
      .then((user) => {
        if (user?.onboardingCompletedAt) {
          navigate("/dashboard", { replace: true });
        }
      })
      .finally(() => setChecking(false));
  }, [navigate]);

  const form = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      organization: "",
      city: "",
      mobile: "",
      isFromCgc: false,
      rollNumber: "",
      college: "",
      branch: "",
      section: "",
      semester: "",
    },
  });

  const isFromCgc = form.watch("isFromCgc");

  const onSubmit = async (values) => {
    setSubmitError("");
    const body = {
      firstName: values.firstName.trim(),
      lastName: values.lastName?.trim() ?? "",
      organization: values.organization.trim(),
      city: values.city.trim(),
      mobile: values.mobile.trim(),
      isFromCgc: values.isFromCgc,
      ...(values.isFromCgc
        ? {
            rollNumber: values.rollNumber?.trim() ?? "",
            college: values.college?.trim() ?? "",
            branch: values.branch?.trim() ?? "",
            section: values.section?.trim() ?? "",
            semester: values.semester?.trim() ?? "",
          }
        : {}),
    };
    try {
      await submitOnboarding(body);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setSubmitError(err.message || "Failed to save. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center relative overflow-x-hidden overflow-y-auto py-12 font-['Space_Grotesk',sans-serif] bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgImage})`,
      }}
    >
      {checking ? (
        <div className="relative z-20 flex items-center justify-center min-h-[200px]">
          <p className="text-white/80">Loading…</p>
        </div>
      ) : (
        <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] text-center z-[1] pointer-events-none">
        <h1
          className="font-['Syne',sans-serif] font-extrabold text-[15vw] leading-none whitespace-nowrap text-white/[0.02] [-webkit-text-stroke:2px_rgba(168,85,247,0.1)] [text-shadow:0_0_80px_rgba(168,85,247,0.4)] blur-[0.5px] md:text-[20vw] md:whitespace-normal md:w-full md:leading-snug"
          aria-hidden
        >
          ONBOARDING
        </h1>
      </div>

      <div className="fixed w-fit h-fit rounded-full blur-[100px] opacity-50 bg-violet-900 z-0 md:w-[300px] md:h-[300px] md:opacity-40" aria-hidden />
      <div className="fixed w-fit h-fit rounded-full blur-[100px] opacity-50 bg-purple-700 z-0 md:w-[300px] md:h-[300px] md:opacity-40" aria-hidden />

      <div className="relative z-10 w-full flex justify-center px-5 py-10 md:px-4">
        <div
          className="w-fit min-w-[420px] max-w-[520px] py-12 px-10 md:py-8 md:px-6 bg-[rgba(10,10,10,0.6)] backdrop-blur-[20px] border border-white/[0.08] border-t-white/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fadeSlideUp"
          style={{ opacity: 1 }}
        >
          <div className="text-center mb-8">
            <h2 className="font-['Syne',sans-serif] text-3xl text-white mb-2 md:text-[1.75rem]">
              E-SUMMIT<span className="text-purple-500">.</span>
            </h2>
            <p className="text-zinc-400 text-sm">Complete your profile.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Ayush"
                        className={cn(inputClass, "border-input")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Chugh"
                        className={cn(inputClass, "border-input")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Organization</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Acme Corp"
                        className={cn(inputClass, "border-input")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Chandigarh"
                        className={cn(inputClass, "border-input")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Mobile number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 9876543210"
                        className={cn(inputClass, "border-input")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFromCgc"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <FormLabel className="text-zinc-300 text-base font-normal">
                      I am from CGC (Chandigarh Group of Colleges)
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-purple-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {isFromCgc && (
                <>
                  <FormField
                    control={form.control}
                    name="rollNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">Roll number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 20BCS123"
                            className={cn(inputClass, "border-input")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">College</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. CGC Landran"
                            className={cn(inputClass, "border-input")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">Branch</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. CSE"
                            className={cn(inputClass, "border-input")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">Section</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. A"
                            className={cn(inputClass, "border-input")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300">Semester</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 3"
                            className={cn(inputClass, "border-input")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm" />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {submitError && (
                <p className="py-3 px-4 rounded-md text-sm text-center bg-red-500/10 text-red-400 border border-red-500/20">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full mt-4 py-4 rounded-xl border-0 bg-gradient-to-br from-violet-400 to-purple-600 text-white font-['Syne',sans-serif] font-bold text-base uppercase tracking-wide hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(147,51,234,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {form.formState.isSubmitting ? "Saving…" : "Complete"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
        </>
      )}
    </div>
  );
}

export default Onboarding;
