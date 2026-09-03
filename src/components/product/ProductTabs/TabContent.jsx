const TabContent = ({ content }) => {
  return (
    <div
      className="
        mt-8
        bg-white
        rounded-2xl
        border
        p-8
        leading-8
        text-gray-600
        whitespace-pre-line
      "
    >
      {content}
    </div>
  );
};

export default TabContent;
