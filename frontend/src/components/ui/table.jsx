import React from "react";

export function Table({ children, className }) {
  return <table className={`w-full text-sm ${className}`}>{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody className="divide-y">{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="hover:bg-gray-50">{children}</tr>;
}

export function TableHead({ children }) {
  return (
    <th className="px-4 py-2 text-left font-semibold text-gray-700">
      {children}
    </th>
  );
}

export function TableCell({ children }) {
  return <td className="px-4 py-2">{children}</td>;
}
