import React, { createContext, useContext, useState } from "react";

// 전역 컨텍스트 생성
const TabsContext = createContext();

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }) {
  return <div className="flex space-x-2 mb-4">{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside <Tabs>");

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`px-4 py-2 rounded ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const context = useContext(TabsContext);
  if (!context) return null;

  return context.activeTab === value ? <div>{children}</div> : null;
}
