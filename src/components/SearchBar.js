import { useNavigate } from "react-router-dom";
const SearchBar = ({
  setFocus,
  deFocus,
  titleSearch,
  isFocused,
  categorySearch,
  searchValue,
  setSearchValue,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (productId) => {
    navigate(`/product/single/${productId}`);
  };

  return (
    <div
      className="flex justify-center items-center"
      id="searchbar"
      onFocus={setFocus}
    >
      <input
        type="text"
        className="w-full sm:w-[250px] inset-x-0 mx-auto p-2 focus:absolute focus:outline-none focus:z-50 focus:w-[80%] rounded"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {isFocused && titleSearch.length > 0 && (
        <div className="z-50 w-[80%] bg-white absolute inset-x-0 mx-auto top-20 h-80 overflow-y-auto">
          <h1 className="bg-neutral text-white py-2 font-semibold">
            Search results by Title:
          </h1>
          {titleSearch?.map((product) => {
            return (
              <p
                onClick={() => {
                  handleNavigate(product._id);
                  deFocus();
                  setSearchValue("");
                }}
                className="text-left p-2 border-b hover:cursor-pointer hover:bg-neutral-100"
                key={product._id}
              >
                {product.title}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
