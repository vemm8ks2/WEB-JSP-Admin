import { Dispatch } from "react";
import { Ellipsis } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import ProductUpdateDialog from "./ProductUpdateDialog";
import { Product } from ".";

const serverUrl = import.meta.env.VITE_JSP_SERVER_URL;

const ProductDropdownMenu = ({ 
  product,
  setProductsList
}: { 
  product: Product;
  setProductsList: Dispatch<React.SetStateAction<Product[]>>
}) => {
  const handleDelete = () => {
    if (confirm('정말로 삭제하시겠습니까? 삭제 이후에는 복구가 불가능합니다.')) {
      const data = {
        product_id: product.productId,
        product_name: product.productName
      };

      fetch(`${serverUrl}/product`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(data => {
          setProductsList(prev => prev.filter(p => p.productId != product.productId));
          alert(data.msg);
        })
    }
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="text-gray-700" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="p-0">
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full">수정</Button>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <Button 
              variant="ghost" 
              onClick={handleDelete} 
              className="w-full text-red-500"
            >
              삭제
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProductUpdateDialog product={product} setProductsList={setProductsList} />
    </Dialog>
  )
}

export default ProductDropdownMenu