import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useCategories from '@/api/useCategories';

import 'react-quill/dist/quill.snow.css';

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  productPrice: z.string(),
  productStock: z.string(),
  productImage: z.instanceof(File)
    .refine((file) => file.size < 10000000, {
      message: 'Your resume must be less than 10MB.',
    }),
  productCategory: z.string(),
})

const serverUrl = import.meta.env.VITE_JSP_SERVER_URL;

const CreateProduct = () => {
  const { categoryList } = useCategories();
  const [description, setDescription] = useState('');

  const modules = useMemo(() => ({
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
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formData = new FormData();

    formData.append('product_name', values.productName);
    formData.append('product_price', values.productPrice);
    formData.append('product_stock', values.productStock);
    formData.append('product_category', values.productCategory);
    formData.append('product_image', values.productImage!)
    formData.append('product_description', description);

    fetch(`${serverUrl}/product`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        alert(data.msg); 
      });
  }

  return (
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="상품의 카테고리를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryList.map(({ categoryId, categoryName }) => (
                      <SelectItem value={categoryId.toString()}>
                        {categoryName}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productImage"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>이미지</FormLabel>
              <FormControl>
                <Input 
                  {...fieldProps}
                  type="file"
                  placeholder="이미지"
                  accept="image/*"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ReactQuill 
          theme="snow" 
          value={description} 
          onChange={setDescription} 
          modules={modules} 
          className=''
        />
        <Button type="submit">생성하기</Button>
      </form>
    </Form>
  )
};

export default CreateProduct;
