import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCategoryForm from "./CreateCategoryForm";
import { Categorize } from ".";

const CreateCategoryModal = ({ categories }: { categories: Categorize[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>카테고리 생성</Button>
      </DialogTrigger>
      <DialogContent className="w-max">
        <DialogHeader>
          <DialogTitle>카테고리 생성하기</DialogTitle>
          <DialogDescription>
            새로 생성할 카테고리의 이름과 부모 카테고리를 지정해주세요.
          </DialogDescription>
        </DialogHeader>
        <CreateCategoryForm categories={categories} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
