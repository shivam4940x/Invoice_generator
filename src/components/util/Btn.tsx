interface DemoButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

const Btn: React.FC<DemoButtonProps> = ({
  children,
  onClick,
  type,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="bg-forground group text-background px-6 py-1 relative capitalize"
    >
      <div className="absolute div top-0 left-0  bg-black -z-10 group-hover:translate-x-2 group-hover:translate-y-2 duration-150"></div>
      <div className="w-max">{children}</div>
    </button>
  );
};

export default Btn;
