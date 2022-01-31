const FilterReset = ({setCategories}) => {
  return (
    <div>
      <button type="reset" id='reset-chosenCategories' onClick={setCategories}>Reiniciar</button>
    </div>
  )
}
export default FilterReset