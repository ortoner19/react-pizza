import React, { Children } from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import NotFound from "./pages/NotFound";
import { Routes, Route, Outlet } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// export const SearchContext = React.createContext();

// function Parent({children}) {
//   return <div>
//     <h1>Заголовок</h1>
//     {/* {children} */}
//     <Outlet />
//   </div>
// }

function App() {
  // const [searchValue, setSearchValue] = React.useState('');
  return (
    // <div className="wrapper">
    // {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
    // {/* <Header /> */}
    // {/* <Parent>55555</Parent> */}
    // <div className="content">
    // <Routes>
    // <Route path="/" element={<Home />} />
    // <Route path="/cart" element={<Cart />} />
    // <Route path="/pizza/:id" element={<FullPizza />} />
    // <Route path="*" element={<NotFound />} />
    // </Routes>
    // </div>
    // {/* </SearchContext.Provider> */}
    // </div>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

//useEffect тут обьясняли, шо треба для того, шоб відіслать токо один фетч запит на сєрвєр, а не бесконєчну їх кількість; didMount - перший рендер
