// src/components/ui/card.jsx

export function Card({ children, className = "" }) {
    return (
      <div className={`rounded-xl border bg-white p-6 shadow ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className = "" }) {
    return <div className={`mt-2 ${className}`}>{children}</div>;
  }
  