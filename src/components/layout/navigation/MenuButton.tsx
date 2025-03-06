import { cn } from '../../../utils/cn';

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  isOpen,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500",
        isOpen && "bg-gray-100",
        className
      )}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      {...props}
    >
      <span className="sr-only">{isOpen ? "Fechar menu" : "Abrir menu"}</span>
      <svg
        className={cn("h-6 w-6", isOpen && "menu-icon-open")}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        />
      </svg>
    </button>
  );
}; 