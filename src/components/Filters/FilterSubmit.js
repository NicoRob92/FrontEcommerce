const FilterSubmit = ({setCategories}) => {
  return (
    <div>
      <input id='filter' type="button" value="buscar" onClick={setCategories}/>
    </div>
  )
}
export default FilterSubmit