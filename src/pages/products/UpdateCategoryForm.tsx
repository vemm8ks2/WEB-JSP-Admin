import { Dispatch } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

import { Product } from '.';

const formSchema = z.object({
  productPrice: z.string(),
  productStock: z.string(),
})

const serverUrl = import.meta.env.VITE_JSP_SERVER_URL;

const UpdateCategoryForm = ({ 
  product,
  setProductsList
}: { 
  product: Product;
  setProductsList: Dispatch<React.SetStateAction<Product[]>>
}) => {

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data = {
      product_id: product.productId,
      product_name: product.productName,
      updated_price: values.productPrice,
      updated_stock: values.productStock
    };

    fetch(`${serverUrl}/product`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        setProductsList(prev => {
          return prev.map(p => {
            if (p.productId == product.productId) {
              return {
                ...p,
                productPrice: Number(values.productPrice),
                productStock: Number(values.productStock)
              };
            }
            return p;
          })
        });
        alert(data.msg);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-64">
        <FormItem>
          <FormLabel>상품명</FormLabel>
          <FormControl>
            <Input disabled value={product.productName} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="productPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex justify-between'>상품가{' '}
                <span className='text-xs'>기존 상품가 : {product.productPrice}원</span>
              </FormLabel>
              <FormControl>
                <Input 
                  defaultValue={product.productPrice}
                  placeholder={`기존 상품가 : ${product.productPrice}`} 
                  {...field} 
                />
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
              <FormLabel className='flex justify-between'>
                재고량{' '}
                <span className='text-xs'>기존 재고량 : {product.productStock}</span>
              </FormLabel>
              <FormControl>
                <Input 
                  defaultValue={product.productStock}
                  placeholder={`기존 재고량 : ${product.productStock}`} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full'>수정하기</Button>
      </form>
    </Form>
  )
}

export default UpdateCategoryForm