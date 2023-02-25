import React from "react";

export function SelectSize({ arr, size }) {
  const [sizeSelected, setSizeSelected] = size;
	
  return (
		<p>
			Размеры в наличии:{" "}
			{arr.map((item) => (
				<span
					key={item.size}
					className={`catalog-item-size${
						item.size === sizeSelected ? " selected" : ""
					}`}
					onClick={() =>
						setSizeSelected((prev) => prev !== item.size && item.size)
					}
				>
					{item.size}
				</span>
			))}
		</p>
  );
}
