import { Dispatch } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import UpdateCategoryForm from "./UpdateCategoryForm";
import { Product } from ".";

const ProductUpdateDialog = ({ 
  product,
  setProductsList
}: { 
  product: Product;
  setProductsList: Dispatch<React.SetStateAction<Product[]>>
}) => {
  return (
    <DialogContent className="w-max">
      <DialogHeader>
        <DialogTitle>상품 수정하기</DialogTitle>
        <DialogDescription>
          상품의 수정 사항을 입력해주세요.
        </DialogDescription>
        <UpdateCategoryForm product={product} setProductsList={setProductsList} />
      </DialogHeader>
    </DialogContent>
  )
}

export default ProductUpdateDialog