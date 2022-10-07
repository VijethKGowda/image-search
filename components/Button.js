function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Button = ({ onClick, children, className, type, disable }) => (
  <button
    onClick={onClick}
    type={type}
    disable={disable}
    className={classNames(
      className,
      "px-8 py-4 border border-blue-400 hover:border-blue-500"
    )}
  >
    {children}
  </button>
);

export default Button;
