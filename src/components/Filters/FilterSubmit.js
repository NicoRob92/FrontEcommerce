const FilterSubmit = ({setCategories}) => {
  return (
    <div>
      <input id='search' type="button" value="buscar" onClick={setCategories}/>
    </div>
  )
}
export default FilterSubmit