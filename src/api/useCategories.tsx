import { useEffect, useState } from "react";

export interface Category {
  categoryName: string;
  categoryId: number;
  categoryParentFk: number;
}

const serverUrl = import.meta.env.VITE_JSP_SERVER_URL;

const useCategories = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${serverUrl}/category`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setCategoryList(data.categoryList));
  }, []);

  return { categoryList }
}

export default useCategories