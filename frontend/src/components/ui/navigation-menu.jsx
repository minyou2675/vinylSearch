export function NavigationMenu({ children, className = "" }) {
    return <div className={className}>{children}</div>;
  }
  export function NavigationMenuList({ children, className = "" }) {
    return <ul className={className}>{children}</ul>;
  }
  export function NavigationMenuItem({ children }) {
    return <li>{children}</li>;
  }
  export function NavigationMenuLink({ children, className = "" }) {
    return <a className={className}>{children}</a>;
  }
  