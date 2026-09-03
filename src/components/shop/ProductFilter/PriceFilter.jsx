import "./PriceFilter.css";

const MIN_PRICE = 499;
const MAX_PRICE = 5000;

const PriceFilter = ({ value = MAX_PRICE, onChange }) => {
  const pct = ((value - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-500">Up to</span>
        <span className="rounded-sm bg-black px-3 py-1 text-xs font-bold text-white">
          ₹{value.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="price-slider"
          style={{ "--pct": `${pct}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
        <span>₹{MIN_PRICE.toLocaleString("en-IN")}</span>
        <span>₹{MAX_PRICE.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
};

export default PriceFilter;
