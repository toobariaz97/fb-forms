interface CustomTxtFieldProps {
  error?: boolean;
  label?: string;
  placeholder?: string;
  errorClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  mainClassName?: string;
  type?: string;
  errorMessage?: string;
  name: string;
  select?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: Array<{ label: string; value: string }>;
  value?: string;
  as?: string;
  // component?: string | React.ComponentType<FieldProps>;
  className?: string;
  handleChange?: () => void;
}

const CustomTxtField: React.FC<CustomTxtFieldProps> = (props) => {
  const {
    error,
    label,
    placeholder,
    errorClassName,
    labelClassName,
    mainClassName,
    type = "text",
    errorMessage,
    name,
    className,
    handleChange,
    value,
    ...rest
  } = props;

  return (
    <div className={className || `form-group ${mainClassName}`}>
      {label && (
        <label className={`${labelClassName} mb-1 block text-gray-200`}>
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        // component={component}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-1 py-2 bg-transparent border-b `}
        {...rest}
      />
      {error && errorMessage && (
        <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CustomTxtField;
