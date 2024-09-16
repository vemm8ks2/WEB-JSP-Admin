export interface Category {
  categoryName: string;
  categoryId: number;
  categoryParentFk: number;
}

export interface Categorize extends Category {
  subcategories: Categorize[];
}
