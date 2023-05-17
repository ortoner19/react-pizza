import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId, setCurrentPage  } from '../redux/slices/filterSlice';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
// import pizzas from './assets/pizzas.json'

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  // const categoryId = useSelector(state => state.filter.categoryId);
  // const sortType = useSelector(state => state.filter.sort.sortProperty);

  const { searchValue } = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)

  // const [categoryId, setCategoryId] = React.useState(0);  // категорії це мясні, гриль і тд піцци. категорія 0 це усі піции со старту // убрали на 13ом урокі

  // const [sortType, setSortType] = React.useState({
  //   name: 'популярности',
  //   sortProperty: 'rating',
  // });

  const onChangeCategory = (id) => {
    // console.log(id); // номер катєгорії получаю
    dispatch(setCategoryId(id))
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  React.useEffect(() => {
    setIsLoading(true);   

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' :'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios.get(`https://63f1fde1aab7d09125ff6f7c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    .then((res) => {
      // console.log(res); // в data наші піцци
      setItems(res.data); // установили піци і ниже отключіли скєлєтон
      setIsLoading(false);
    });
    window.scrollTo(0,0);
      }, [categoryId, sort.sortProperty, searchValue, currentPage])
  //   fetch(`https://63f1fde1aab7d09125ff6f7c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((arr) => {
  //       setItems(arr);
  //       setIsLoading(false);
  //     })
  //     window.scrollTo(0,0); // оце шоб уверху сторінка з'являлася
  // }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items
  // .filter(obj => {  // це з фронта фільтр переробили на пошук в бекі, того це убрали
  //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) { // оце фільтр по тому шо вводим в інпуті
  //     return true;
  //   }
  //   return false
  // })
  .map((obj) => <PizzaBlock key={obj.id} {...obj} />); // рендер піцц
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className='container'>
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory}/> 
          {/* <Sort value={sortType} onChangeSort={(i)=> setSortType(i) }/> */}
          <Sort  />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? skeletons
            :pizzas }

          {/* //               items.map((obj) => isLoading ? <Skeleton /> : (
//                 <PizzaBlock key={obj.id}
//                   {...obj} /> ))}
//  */}

          {/* title={obj.title} price={obj.price} image={obj.imageUrl} sizes={obj.sizes} types={obj.types} */}
          {/* <PizzaBlock title="Мексиканская" price={500}/> */}
        </div>
        <Pagination currentPage={currentPage} onChangePage = {onChangePage} />
      </div>
    </>
  )
}

export default Home;

//сортінг і фільтрация
//https://github.com/mockapi-io/docs/wiki/Code-examples#pagination
// урок 9, сортінг: sortBy=category&order=desc - це сортіровку роби по category (це ключ в обьєкті) і order (сортіруй) в порядку desc убиванія  // вначалі sortBy можна писать, а можна писать orderBy
// https://63f1fde1aab7d09125ff6f7c.mockapi.io/items?orderBy=price&order=desc отсортірували тут по ціні низпадающой і добали поіск папероні у кінці: https://63f1fde1aab7d09125ff6f7c.mockapi.io/items?orderBy=price&order=desc&search=Пепперони
// по поіску можна писать filter або search  // &search=Пепперони або &filter=Пепперони
// дальше можна розширять параметри поіска https://63f1fde1aab7d09125ff6f7c.mockapi.io/items?orderBy=price&order=desc&filter=Пепперони&category=2&rating=1 , тіпа через & добавляєм шо + шукаєм по категорії 2 і рейтінгу 1 
// фільтр по категоріям: https://63f1fde1aab7d09125ff6f7c.mockapi.io/items?orderBy=price&order=desc&category=1