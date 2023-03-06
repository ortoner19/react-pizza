import React from 'react'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
// import pizzas from './assets/pizzas.json'
// console.log(pizzas);

const Home = () => {

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)

  const [categoryId, setCategoryId] = React.useState(0);  // категорії це мясні, гриль і тд піцци. категорія 0 це усі піции со старту
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);   

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' :'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : ''

    fetch(`https://63f1fde1aab7d09125ff6f7c.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      })
      window.scrollTo(0,0); // оце шоб уверху сторінка з'являлася
  }, [categoryId, sortType])



  return (
    <>
      <div className='container'>
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(i)=> setCategoryId(i) }/> 
          <Sort value={sortType} onChangeSort={(i)=> setSortType(i) }/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}

          {/* //               items.map((obj) => isLoading ? <Skeleton /> : (
//                 <PizzaBlock key={obj.id}
//                   {...obj} /> ))}
//  */}

          {/* title={obj.title} price={obj.price} image={obj.imageUrl} sizes={obj.sizes} types={obj.types} */}
          {/* <PizzaBlock title="Мексиканская" price={500}/> */}
        </div>
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