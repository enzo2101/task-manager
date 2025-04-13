import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { MultiSelect } from "@/components/ui/multi-select";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "O título deve ter pelo menos 5 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  responsible: z.string().array().min(1, {
    message: "Selecione um responsável.",
  }),
  dueDate: z.date({
    required_error: "Por favor selecione uma data.",
  }),
});

export type FormTaskValues = z.infer<typeof formSchema>;

interface FormTaskProps {
  onSubmit: (values: FormTaskValues) => void;
}

export default function FormTask({ onSubmit }: FormTaskProps) {
  const form = useForm<FormTaskValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      responsible: [],
    },
  });

  const responsibles = [
    { value: "Pedro", label: "Pedro" },
    { value: "Henrique", label: "Henrique" },
    { value: "Guilherme", label: "Guilherme" },
    { value: "José", label: "José" },
    { value: "Michael", label: "Michael" },
    { value: "Joao", label: "Joao" },
  ];

  useEffect(() => {
    form.reset();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título da tarefa</FormLabel>
              <FormControl>
                <Input
                  placeholder={form.formState.errors.title?.message || ""}
                  className="placeholder:text-error"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição da tarefa</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={form.formState.errors.description?.message || ""}
                  className="max-h-36 resize-none overflow-y-auto no-scrollbar placeholder:text-error"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsible"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsáveis</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder={form.formState.errors.responsible?.message || ""}
                  options={responsibles}
                  onValueChange={field.onChange}
                  variant="default"
                  animation={2}
                  maxCount={3}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Data limite</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "text-left font-normal rounded-3xl border-input p-5",
                          !field.value && "text-muted-foreground"
                        )}
                        type="button"
                      >
                        {form.formState.errors.dueDate?.message ? (
                          <span className="text-error">Data invalida</span>
                        ) : field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span className="text-input">Data:</span>
                        )}

                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Adicionar tarefa
          </Button>
        </div>
      </form>
    </Form>
  );
}
