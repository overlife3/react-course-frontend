import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requestRetry from "../../services/api/requestRetry";
import { Preloader } from "./Preloader";
import { ErrorMessage } from "./ErrorMessage";
import { SelectSize } from "./SelectSize";
import { SelQuantily } from "./SelQuantily";
import { InCartBtn } from "./InCartBtn";

export function CardInfo() {
  const { id } = useParams();
  const [quant, setQuant] = useState(0);
  const [size, setSize] = useState();
  const [cardInfo, setCardInfo] = useState({
    body: undefined,
    loading: true,
    error: false,
  });
  const arrSizeAvalible = cardInfo.body?.sizes.filter((item) => item.avalible);

  useEffect(() => {
      requestRetry(`${process.env.REACT_APP_BASE_URL}items/` + id).then((res) =>
        setCardInfo({ body: res, loading: false, error: false })
      ).catch(() => 
				setCardInfo({ body: undefined, loading: false, error: true })
			)
  }, []);

  return (
    <>
      {cardInfo.loading && <Preloader ofPage/>}
      {cardInfo.error && <ErrorMessage>Произошла ошибка</ErrorMessage>}
      {!cardInfo.loading && !cardInfo.error && (
        <main className="container">
          <div className="row">
            <div className="col">
              <section className="catalog-item">
                <h2 className="text-center">{cardInfo.body.title}</h2>
                <div className="row">
                  <div className="col-5">
                    <img
                      src={cardInfo.body.images[0]}
                      className="img-fluid"
                      alt={cardInfo.body.title}
                    />
                  </div>
                  <div className="col-7">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Артикул</td>
                          <td>{cardInfo.body.sku}</td>
                        </tr>
                        <tr>
                          <td>Производитель</td>
                          <td>{cardInfo.body.manufacturer}</td>
                        </tr>
                        <tr>
                          <td>Цвет</td>
                          <td>{cardInfo.body.color}</td>
                        </tr>
                        <tr>
                          <td>Материалы</td>
                          <td>{cardInfo.body.material}</td>
                        </tr>
                        <tr>
                          <td>Сезон</td>
                          <td>{cardInfo.body.season}</td>
                        </tr>
                        <tr>
                          <td>Повод</td>
                          <td>{cardInfo.body.reason}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-center">
                      <SelectSize
                        size={[size, setSize]}
                        arr={arrSizeAvalible}
                      />
                      {arrSizeAvalible !== 0 && (
                        <SelQuantily prop={[quant, setQuant]} />
                      )}
                    </div>
                    {arrSizeAvalible !== 0 && (
                      <InCartBtn
                        wareInfo={{
                          id: id,
                          title: cardInfo.body.title,
                          size,
                          quant,
                          price: cardInfo.body.price,
                        }}
                        size={size}
                        quant={quant}
                      />
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
