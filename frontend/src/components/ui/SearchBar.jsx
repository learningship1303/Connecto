import { Search, X } from "lucide-react";
import { useState } from "react";

const SearchBar = ({
  placeholder = "Search...",
  value = "",
  onChange,
  className = "",
}) => {
  const [search, setSearch] = useState(value);

  const handleChange = (e) => {
    setSearch(e.target.value);

    if (onChange) {
      onChange(e.target.value);
    }
  };

  const clearSearch = () => {
    setSearch("");

    if (onChange) {
      onChange("");
    }
  };

  return (
    <div className={`relative w-full ${className}`}>

      {/* Search Icon */}

      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-500
          pointer-events-none
        "
      />

      {/* Input */}

      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-900/80
          backdrop-blur-md
          py-3
          pl-12
          pr-12
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-300
          focus:border-violet-500
          focus:ring-2
          focus:ring-violet-500/20
          hover:border-slate-500
        "
      />

      {/* Clear Button */}

      {search.length > 0 && (
        <button
          onClick={clearSearch}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            p-1
            rounded-full
            text-slate-400
            hover:text-white
            hover:bg-slate-700
            transition
          "
        >
          <X size={16} />
        </button>
      )}

    </div>
  );
};

export default SearchBar;