// components/CategoryFilter.tsx
"use client";

import React from "react";
import { Category } from "@/types/agency";
import Link from "next/link";

interface CategoryFilterProps {
  categories: Category[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories }) => {
  return (
    <div className="category-filter">
      <h3>Filtrer par catégorie</h3>
      <ul>
        <li>
          <Link href="/store/agences">Toutes les agences</Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/store/agences/${category.id}`}>
              {category.name} ({category.type} - {category.domain})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;