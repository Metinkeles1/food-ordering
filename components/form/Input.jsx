
const Input = (props) => {
    const {type,placeholder, errorMessage, touched ,...inputProps} = props;
    console.log(errorMessage)
    return (
        <div className='w-full'>
            <label className='relative block cursor-text w-full'>
                <input type={type} className={`h-14 w-full border outline-none px-4 peer ${type !== "datetime-local" && "pt-2"} ${ touched &&errorMessage ? "border-danger" : "border-primary"}`} required {...inputProps} />
                {type !== "datetime-local" && (
                    <span className='absolute flex items-center top-0 left-0 px-4 text-sm h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all'>{placeholder}</span>
                ) }
            </label>
            {touched && <span className="text-xs text-danger">{errorMessage}</span>}
        </div>
    )
}

export default Input