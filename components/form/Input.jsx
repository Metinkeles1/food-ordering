const Input = ({
  type,
  placeholder,
  errorMessage,
  touched,
  value = "",
  onChange,
  onBlur,
  ...inputProps
}) => {
  if (type === "textarea") {
    return (
      <div className='w-full'>
        <label className='relative block cursor-text w-full'>
          <textarea
            className={`h-36 w-full border outline-none p-4 pt-2 ${
              touched && errorMessage ? "border-danger" : "border-primary"
            }`}
            required
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...inputProps}
          />
        </label>
        {touched && <span className='text-xs text-danger'>{errorMessage}</span>}
      </div>
    );
  }

  return (
    <div className='w-full'>
      <label className='relative block cursor-text w-full'>
        <input
          type={type}
          className={`h-14 w-full border outline-none px-4 peer ${
            type !== "datetime-local" && "pt-2"
          } ${touched && errorMessage ? "border-danger" : "border-primary"}`}
          required
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...inputProps}
        />
        {type !== "datetime-local" && (
          <span className='absolute flex items-center top-0 left-0 px-4 text-sm h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all'>
            {placeholder}
          </span>
        )}
      </label>
      {touched && <span className='text-xs text-danger'>{errorMessage}</span>}
    </div>
  );
};

export default Input;
