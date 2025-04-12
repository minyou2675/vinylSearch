export function Separator({ orientation = "horizontal", className = "" }) {
    const baseClass =
      orientation === "vertical"
        ? "w-[1px] h-full bg-gray-300"
        : "h-[1px] w-full bg-gray-300";
  
    return <div className={`${baseClass} ${className}`} />;
  }
  