const FormProductDetail = ({ nextStep, handleChange, input }) => {
    const continues = (e) => {
        e.preventDefault()
        nextStep()
    }
    return (
        <div>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name="name" defaultValue={input.name} onChange={e => handleChange(e)} />
                <div className="form-text">This will be the title, please indicate product, brand and model, ex. Google Pixel 6 Pro 128GB white</div>
            </div>
            <button className="btn btn-primary" onClick={continues}>Continue</button>
        </div>
    )

}

export default FormProductDetail