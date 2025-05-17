interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: "all", label: "Todas" },
    { id: "pending", label: "Pendentes" },
    { id: "completed", label: "Concluídas" },
  ]

  return (
    <div className="bg-white shadow-md rounded-lg mb-6 overflow-hidden">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
            data-cy={`tab-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabNavigation
