import React from "react";
import { Link } from "react-router-dom";

export function Page404() {
	return(
		<main className="container">
		<div className="row">
			<div className="col">
				<section className="page-404 top-sales">
					<h2 className="text-center">Страница не найдена</h2>
					<p>
						Извините, страница не найдена!
					</p>
					<p>
						Возвращайтесь обратно. <Link to={"/"}>на главную</Link>
					</p>
				</section>
			</div>
		</div>
	</main>
	)
}