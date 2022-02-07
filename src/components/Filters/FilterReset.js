const FilterReset = ({setCategories}) => {
  return (
    <div>
      <button type="reset" id='reset' onClick={setCategories}>Reiniciar</button>
    </div>
  )
}
export default FilterReset