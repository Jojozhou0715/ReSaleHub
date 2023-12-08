import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import lazyload from "./lazyload";

// const ShoppingCart = lazyload(() => import("../../../src/pages/home/shoppingCart"))
const Home = lazyload(() => import("../../../src/pages/home"));
const Detail = lazyload(() => import("../../../src/pages/detail/itemDetail"));

const PageLayout = () =>{
    return(
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route key="/" path="/" element={<Home />} />
                <Route key="/detail" path="/detail/:id" element={<Detail />} />
                {/* <Route key="/carts" path="/carts" element={<ShoppingCart />} /> */}
                <Route 
                  key="*"
                  path="*"
                  element={
                    <h3>
                        status="404"
                        subTitle="Whoops, that page is gone!"
                    </h3>
                  }
                  />
            </Routes>
          </Suspense>
        </BrowserRouter>
    )
}

export default PageLayout;