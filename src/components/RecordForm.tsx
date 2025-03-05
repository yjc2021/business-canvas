import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { TRecord } from "@/types";
import { TPosition } from "../types/index";

const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  memo: z.string(),
  joinedAt: z.date(),
  position: z.enum(["개발자", "PO", "디자이너"]),
  consentToEmail: z.boolean(),
});
type TRecordFormProps = {
  onSubmit: (newRecord: Omit<TRecord, "id">) => void;
  onCancel: () => void;
};
function RecordForm({ onSubmit, onCancel }: TRecordFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      memo: "",
      joinedAt: new Date(),
      position: "개발자" as TPosition,
      consentToEmail: false,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit({ ...values, joinedAt: format(values.joinedAt, "yyyy-MM-dd") });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>이름</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>주소</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메모</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Textarea" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="joinedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel required>가입일</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? format(field.value, "yyyy-MM-dd") : <span>Select date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>직업</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="개발자">개발자</SelectItem>
                  <SelectItem value="PO">PO</SelectItem>
                  <SelectItem value="디자이너">디자이너</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consentToEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일 수신 동의</FormLabel>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4">
          <Button
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
            variant="outline"
          >
            취소
          </Button>
          <Button type="submit">저장</Button>
        </div>
      </form>
    </Form>
  );
}

export default RecordForm;
