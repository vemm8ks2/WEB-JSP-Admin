import { Button } from "@/components/ui/button";
import { Categorize, Category } from ".";
import { Dispatch } from "react";

const Categories = ({
  categories,
  btnFn,
}: {
  categories: Categorize[];
  btnFn: Dispatch<React.SetStateAction<Category | undefined>>;
}) => {
  if (categories.length == 0) return;

  return (
    <ul className="flex flex-col gap-2">
      {categories.map((category) => (
        <li className="flex gap-4">
          <Button
            variant="ghost"
            onClick={() => btnFn(category)}
            className="w-32"
          >
            {category.categoryName}
          </Button>
          <Categories categories={category.subcategories} btnFn={btnFn} />
        </li>
      ))}
    </ul>
  );
};

export default Categories;
