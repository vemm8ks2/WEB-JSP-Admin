import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { z } from "zod"
import 'react-quill/dist/quill.snow.css';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  productPrice: z.string(),
  productStock: z.string(),
  productImage: z.string(),
})

const CreateProduct = () => {
  const [value, setValue] = useState('');

  const rootPath = import.meta.env.VITE_JSP_DEFAULT_PATH;

  const modules:{} = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ align: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [
          {
            color: [],
          },
          { background: [] },
        ],
      ],
    },
}), []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    fetch(`${rootPath}/createProduct.do`, {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }, // 이게 맞는지 고민해보아야 함.
      body: new URLSearchParams({
      }),
    })
      .then(res => res.json())
      .then(() => {
        alert(`상품 생성 완료!`);
      });
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상품명</FormLabel>
              <FormControl>
                <Input placeholder="상품명" {...field} />
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
          name="productPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상품 가격</FormLabel>
              <FormControl>
                <Input placeholder="상품 가격" {...field} />
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
          name="productStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>재고</FormLabel>
              <FormControl>
                <Input placeholder="재고" {...field} />
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
          name="productImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이미지</FormLabel>
              <FormControl>
                <Input placeholder="이미지" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ReactQuill 
          theme="snow" 
          value={value} 
          onChange={setValue} 
          modules={modules} 
          className=''
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </>
  )
};

export default CreateProduct;
