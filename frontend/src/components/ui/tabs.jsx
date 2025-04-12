import React, { useState } from "react";

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const context = { activeTab, setActiveTab };

  return (
    <div className="w-full">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { context })
      )}
    </div>
  );
}

export function TabsList({ children, context }) {
  return <div className="flex space-x-2 mb-4">{children}</div>;
}

export function TabsTrigger({ value, children, context }) {
  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`px-4 py-2 rounded ${
        isActive
          ? "bg-primary text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}
