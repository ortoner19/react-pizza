import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, imcrementByAmount } from "./redux/slices/filterSlice";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import {  Routes, Route } from "react-router-dom";

export const SearchContext = React.createContext()

function App() {
 const [searchValue, setSearchValue] = React.useState()

 const count = useSelector((state) => state.counterer.count)
 const dispatch = useDispatch()

  return (
      <div className="wrapper">
            <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
      {/* <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
            <Routes>
              <Route path="/" element={<Home  />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
        </SearchContext.Provider> */}
      </div>
  );
}

export default App;

//useEffect тут обьясняли, шо треба для того, шоб відіслать токо один фетч запит на сєрвєр, а не бесконєчну їх кількість; didMount - перший рендер
