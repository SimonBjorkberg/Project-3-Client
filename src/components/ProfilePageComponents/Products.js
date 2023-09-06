import scrollToTop from "../../utils/ScrollToTop";

const Products = ({
  foundUser,
  setProductHovered,
  productHovered,
  loggedInUser,
  recentProducts,
  showMore,
  setShowMore,
}) => {
  return (
    <div className="text-left ml-10 pt-10">
      {!recentProducts ? (
        <p>This user has no listed products!</p>
      ) : (
        recentProducts?.map((product) => {
          return (
            <div
              onMouseEnter={() => {
                setProductHovered(product._id);
              }}
              onMouseLeave={() => setProductHovered(null)}
              key={product._id}
              className="flex py-2 border-b w-[900px] border-neutral hover:bg-neutral-200 hover:cursor-pointer"
            >
              <div className="avatar">
                <div className="w-16 rounded-xl">
                  <img src={product.images[0]} alt="" />
                </div>
              </div>
              <p className="my-auto ml-5 text-xl font-semibold w-44 truncate">
                {product.title}
              </p>
              <p className="my-auto ml-5 text-xl w-20">${product.price}</p>
              <p className="my-auto ml-5 text-xl w-36">
                {product.quantity} item/s
              </p>
              <p className="my-auto ml-5 text-xl w-20">
                {product.likes.length} Like/s
              </p>
              {foundUser._id === loggedInUser?._id &&
                productHovered === product._id && (
                  <div className="my-auto ml-auto flex h-full">
                    <button className="mr-2 h-full p-2 bg-neutral rounded-sm text-neutral-300 hover:bg-blue-900">
                      Edit
                    </button>
                    <button className="mr-2 h-full p-2 bg-neutral rounded-sm text-neutral-300 hover:bg-red-600">
                      delete
                    </button>
                  </div>
                )}
            </div>
          );
        })
      )}
      {!showMore && foundUser?.products.length > 5 && (
        <div className="w-[900px] flex">
          <button onClick={() => setShowMore(true)} className="w-fit ml-auto">
            Show More
          </button>
        </div>
      )}
      {showMore && (
        <div className="w-[900px] flex">
          <button
            onClick={() => {
              setShowMore(false);
              scrollToTop()
            }}
            className="w-fit ml-auto"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
