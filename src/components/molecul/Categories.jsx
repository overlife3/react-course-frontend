import React from "react";

export function Categories({ arr, handleCategori, categorieActive }) {
  return (
    <ul className="catalog-categories nav justify-content-center">
      {[{ id: "all", title: "Все" }, ...arr].map((item) => (
        <li key={item.title} className="nav-link">
          <button
            className={`nav-link${categorieActive === item.id ? " active" : ""}`}
            onClick={() => {
              handleCategori(item.id);
            }}
          >
            {item.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
