import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface Category {
  categoryName: string;
  categoryId: number;
  categoryParentFk: number;
}

const formSchema = z.object({
  category_name: z.string().min(2, {
    message: "category_name must be at least 2 characters.",
  }),
  category_parent_fk: z.string().min(2, {
    message: "category_parent_fk must be at least 2 characters.",
  }),
})

const createCategory = () => {
  const serverUrl = import.meta.env.VITE_JSP_SERVER_URL;

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${serverUrl}/category`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => setCategoryList(data));
  }, [])

  console.log(categoryList);
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: "",
      category_parent_fk: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    fetch(`${serverUrl}/category`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })

    // fetch(`${serverUrl}/createCategory.do`, {
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/x-www-form-urlencoded' }, // 이게 맞는지 고민해보아야 함.
    //   body: new URLSearchParams(values),
    // })
    //   .then(() => {
    //     alert(`카테고리 생성 완료!`);
    //   });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="category_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리명</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_parent_fk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>부모 카테고리 식별자</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default createCategory