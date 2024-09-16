import { useEffect, useState } from "react";
import { Categorize, Category as ICategory } from ".";
import Categories from "./Categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreateCategoryModal from "./CreateCategoryModal";
import Header from "../components/Header/Header";

const Category = () => {
  const serverUrl = import.meta.env.VITE_JSP_SERVER_URL;

  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const [updateCategoryName, setUpdateCategoryName] = useState<string>();

  useEffect(() => {
    fetch(`${serverUrl}/category`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setCategoryList(data.categoryList));
  }, []);

  const handleUpdate = () => {
    if (!selectedCategory || !updateCategoryName) return;

    const data = {
      category_id: selectedCategory.categoryId,
      category_name_before_update: selectedCategory.categoryName,
      category_name_after_update: updateCategoryName,
    };

    fetch(`${serverUrl}/category`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));
  };

  const handleDelete = () => {
    if (!selectedCategory) return;

    const data = {
      category_id: selectedCategory.categoryId,
      category_name: selectedCategory.categoryName,
      category_parent_fk: selectedCategory.categoryParentFk,
    };

    fetch(`${serverUrl}/category`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));
  };

  const categorize = (categoryList: ICategory[]) => {
    const result: Categorize[] = [];
    const lookup: { [key: number]: Categorize } = {};

    // 1. 모든 항목을 'lookup' 객체에 저장
    categoryList.forEach((item) => {
      lookup[item.categoryId] = {
        ...item,
        subcategories: [], // 하위 카테고리들을 담을 배열을 초기화
      };
    });

    // 2. 하위 카테고리 연결 설정
    categoryList.forEach((item) => {
      const parentId = item.categoryParentFk;

      if (parentId === 0) {
        result.push(lookup[item.categoryId]);
      } else if (lookup[parentId]) {
        lookup[parentId].subcategories.push(lookup[item.categoryId]);
      }
    });

    return result;
  };

  const categories = categorize(categoryList);

  return (
    <div className="flex flex-col">
      <Header name="카테고리 목록" />
      <div>
        <div className="mt-5 [&>ul]:flex-row [&>ul]:gap-4 [&>ul>li:nth-child(-n+3)]:bg-white [&>ul>li:nth-child(-n+3)]:shadow [&>ul>li:nth-child(-n+3)]:p-4 [&>ul>li:nth-child(-n+3)]:rounded-lg">
          <Categories categories={categories} btnFn={setSelectedCategory} />
        </div>
        <div className="mt-4">
          <p>
            선택된 카테고리:{" "}
            <span className="text-xl font-bold">
              {selectedCategory?.categoryName}
            </span>
          </p>
          <div className="flex mt-4 gap-2">
            <Input
              value={updateCategoryName}
              onChange={(e) => setUpdateCategoryName(e.target.value)}
              className="w-80"
            />
            <Button variant="ghost" onClick={handleUpdate}>
              선택된 카테고리명 업데이트
            </Button>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="destructive" onClick={handleDelete}>
              선택된 카테고리 삭제
            </Button>
            <CreateCategoryModal categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
