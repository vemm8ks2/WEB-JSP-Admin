import { useEffect, useState } from 'react'

interface Category {
  categoryName: string;
  categoryId: number;
  categoryParentFk: number;
}

interface Categorize extends Category {
  subcategories: Categorize[];
}

const Category = () => {
  const serverUrl = import.meta.env.VITE_JSP_SERVER_URL;

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${serverUrl}/category`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => setCategoryList(data.categoryList));
  }, [])

  const categorize = (categoryList: Category[]) => {
    const result: Categorize[] = [];
    const lookup: { [key: number]: Categorize } = {};
  
    // 1. 모든 항목을 'lookup' 객체에 저장
    categoryList.forEach(item => {
      lookup[item.categoryId] = {
        ...item,
        subcategories: [] // 하위 카테고리들을 담을 배열을 초기화
      };
    });
  
    // 2. 하위 카테고리 연결 설정
    categoryList.forEach(item => {
      const parentId = item.categoryParentFk;
  
      if (parentId === 0) {
        result.push(lookup[item.categoryId]);
      } else if (lookup[parentId]) {
        lookup[parentId].subcategories.push(lookup[item.categoryId]);
      }
    });
  
    return result;
  }
  
  const categories = categorize(categoryList);

  return (
    <div>
      {categories.map(category => (
        <div>
          <p>{category.categoryName}</p>
          <div>
            {category.subcategories.map(category => (
              <div>
                <p>&nbsp;&nbsp;{category.categoryName}</p>
                <div>
                  {category.subcategories.map(category => (
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;{category.categoryName}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Category;