
const Input = (props) => {
    const {type,placeholder,...inputProps} = props;
    return (
        <div className='w-full'>
            <label className='relative block cursor-text w-full'>
                <input type={type} className={`h-14 w-full border border-primary outline-none px-4 peer ${type !== "datetime-local" && "pt-3"}`} required {...inputProps} />
                {type !== "datetime-local" && (
                     <span className='absolute flex items-center top-0 left-0 px-4 text-sm h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all'>{placeholder}</span>
                ) }
            </label>
        </div>
    )
}

export default Input