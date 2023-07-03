import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: any;
}

const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory}) => {


  // const [activeIndex, setactiveIndex] = React.useState(0);

  const categories = [
    'Все',
    'Мясные',
    'Вегетерианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

    return (
      <div className="categories">
      <ul>
        {categories.map((categoryName,i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value == i ? 'active' : ''}>{categoryName}</li>
        ))}
      </ul>
    </div>
    )
  }

  export default Categories;




  // <li onClick={() => onClickCategory(0)} className={activeIndex == 0 ? 'active' : ''}>Все</li>
  // <li onClick={() => onClickCategory(1)} className={activeIndex == 1 ? 'active' : ''}>Мясные</li>
  // <li onClick={() => onClickCategory(2)} className={activeIndex == 2 ? 'active' : ''}>Вегетарианская</li>
  // <li onClick={() => onClickCategory(3)} className={activeIndex == 3 ? 'active' : ''}>Гриль</li>
  // <li onClick={() => onClickCategory(4)} className={activeIndex == 4 ? 'active' : ''}>Острые</li>
  // <li onClick={() => onClickCategory(5)} className={activeIndex == 5 ? 'active' : ''}>Закрытые</li>