import { useState } from "react";
import tabs from "./ProductTabsData";
import TabContent from "./TabContent";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="mt-24">
      <div className="border-b">
        <div className="flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6
                py-4
                font-semibold
                transition

                ${
                  activeTab.id === tab.id
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500 hover:text-black"
                }
              `}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <TabContent content={activeTab.content} />
    </section>
  );
};

export default ProductTabs;
