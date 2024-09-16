import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Categorize } from ".";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  newCategory: z.string({
    required_error: "새로운 카테고리 이름을 기입해주세요.",
  }),
  parentCategory: z.string({
    required_error: "부모 카테고리를 선택해주세요.",
  }),
});

const CreateCategoryForm = ({ categories }: { categories: Categorize[] }) => {
  const serverUrl = import.meta.env.VITE_JSP_SERVER_URL;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = ({
    newCategory,
    parentCategory,
  }: z.infer<typeof FormSchema>) => {
    fetch(`${serverUrl}/category`, {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        category_name: newCategory,
        category_parent_fk: parentCategory,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="newCategory"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>새 카테고리명</FormLabel>
              <FormControl className="col-span-3">
                <Input
                  placeholder="새로운 카테고리 이름을 적어주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentCategory"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>부모 카테고리</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="부모 카테고리를 선택해주세요." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>부모 카테고리를 선택해주세요.</SelectLabel>
                    <SelectItem value="0">없음</SelectItem>
                    <SelectList categories={categories} />
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          카테고리 생성
        </Button>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;

const SelectList = ({
  categories,
  indent = 0,
}: {
  categories: Categorize[];
  indent?: number;
}) => {
  return (
    <>
      {categories.map((category) => (
        <>
          <SelectItem value={`${category.categoryId}`}>
            {Array.from({ length: indent }).map(() => (
              <>&nbsp;</>
            ))}
            {category.categoryName}
          </SelectItem>
          <SelectList categories={category.subcategories} indent={indent + 2} />
        </>
      ))}
    </>
  );
};
