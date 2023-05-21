import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters  } from '../redux/slices/filterSlice';
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
// import pizzas from './assets/pizzas.json'
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
// import sortList from '../components/Sort'


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

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

  const fetchPizzas = () => {
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
  }


  // Если изменили параметры и был первый рендер, то делаем это действие
  React.useEffect(() =>{
    if (isMounted.current) {   // якщо був перший рендер
      const queryString = qs.stringify({   //stringify превращає обьєкт в строчку
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
      // console.log(queryString); // вернуло sortProperty=rating&categoryId=0&currentPage=1
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage])


  //Если был первый рендер, то проверяем URL-параметры и сохраняемся редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      // console.log(params);
      
      const sort = list.find(obj => obj.sortProperty == params.sortProperty )

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
      isSearch.current = true;
    }
  },[]) // при першому рендері тіпа

  // Если был первый рендер, то запрашиваем пиццы 
  React.useEffect(() => {
    window.scrollTo(0,0);

    if(!isSearch.current) {
      fetchPizzas();
    }
      isSearch.current = false;
      }, [categoryId, sort.sortProperty, searchValue, currentPage])





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