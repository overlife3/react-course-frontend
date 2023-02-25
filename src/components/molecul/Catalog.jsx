import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "./Categories";
import { CardItems } from "./CardItems";
import { Preloader } from "./Preloader";
import { categorieRequest } from "../../redux/categorieReducer";
import {
  catalogChangeCategorie,
  catalogRequest,
} from "../../redux/catalogReducer";
import { DownloadMoreBtn } from "./DownloadMoreBtn";
import { NoProductMessage } from "./NoProductsMessage";
import { ErrorMessage } from "./ErrorMessage";

export function Catalog({ofCatalogPage}) {
  const dispatch = useDispatch();
  const categoriesItems = useSelector((state) => state.categorie);
  const catalogItems = useSelector((state) => state.catalog);

  const [reBoot, setReBoot] = useState();
  const [categorieActive, setCategorieActive] = useState("all");
  const params = {
    categoryId: catalogItems.categorie,
    q: ofCatalogPage ? catalogItems.field : "",
  };

  useEffect(() => {
    dispatch(categorieRequest());
    dispatch(catalogRequest({...params, categoryId: "all"}));
  }, []);

  function selectCategori(id) {
    setCategorieActive(id);
    dispatch(catalogChangeCategorie({ ...params, categoryId: id }));
	}

	function downloadMore() {
    dispatch(catalogRequest({ ...params, offset: catalogItems.items.length }));
  }

  return !reBoot ? (
    <>
      {(categoriesItems.loading || catalogItems.loading) && <Preloader ofPage />}
      {(categoriesItems.error || catalogItems.error) && (
        <ErrorMessage>Что то пошло не так!</ErrorMessage>
      )}
      {!categoriesItems.loading &&
        !catalogItems.loading &&
        !categoriesItems.error &&
        !catalogItems.error && (
          <>
            <Categories
              arr={categoriesItems.items}
              categorieActive={categorieActive}
              handleCategori={(categoriId) => selectCategori(categoriId)}
            />
						<div className="row">
							<div className="catalog-cards">
								{catalogItems.items.map((item) => (
									<CardItems key={item.id} obj={item} isCatalog />
								))}
							</div>
						</div>

						<DownloadMoreBtn
							items={catalogItems.items}
							onClick={downloadMore}
						/>
						{!catalogItems.loading && !catalogItems.error && catalogItems.items.length === 0 && <NoProductMessage />}

						{setReBoot(true)}
          </>
        )}
    </>
  ) : (
    <>
      <Categories
        arr={categoriesItems.items}
        categorieActive={categorieActive}
        handleCategori={(categoriId) => selectCategori(categoriId)}
      />
      
				<>
					<div className="row">
						<div className="catalog-cards">
							{catalogItems.items.map((item) => (
								<CardItems key={item.id} obj={item} isCatalog />
								))}
						</div>
					</div>
					<DownloadMoreBtn onClick={downloadMore} items={catalogItems.items}
					/>
					{!catalogItems.loading && !catalogItems.error && catalogItems.items.length === 0 && <NoProductMessage />}
					{catalogItems.loading && <Preloader ofPage />}
					{catalogItems.error && <ErrorMessage>Что то пошло не так!</ErrorMessage>}
        </>
      
    </>
  );
}
