const LikedProducts = ({ foundUser, navigate, loggedInUser }) => {
  return (
    <div className="text-left py-10 bg-neutral-200">
      {!foundUser.productsLiked ? (
        <p>This user has no liked products!</p>
      ) : (
        <div>
          <div className="flex lg:w-[900px] mx-auto">
            <div className="flex flex-row ml-auto">
              <div className="flex flex-row w-40 justify-between">
                <p className="my-auto flex text-sm text-left">Price</p>
                <p className="my-auto flex text-sm text-left">Available</p>
                <p className="my-auto flex text-sm text-left">Likes</p>
              </div>
              <div className="w-[24px]"></div>
            </div>
          </div>
          {foundUser.productsLiked?.map((product) => {
            return (
              <div
                key={product._id}
                className="flex py-2 border-b lg:w-[900px] mx-auto border-neutral hover:bg-neutral-300 hover:cursor-pointer"
                onClick={() => navigate(`/product/single/${product._id}`)}
              >
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-row">
                    <div className="avatar">
                      <div className="w-16 rounded-xl">
                        <img src={product.images[0]} alt="" />
                      </div>
                    </div>
                    <p className="my-auto ml-5 text-sm font-semibold max-w-[80px] md:max-w-[200px] truncate">
                      {product.title}
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <p
                      className={`${
                        loggedInUser?._id === foundUser._id
                          ? "my-auto flex ml-5 text-sm w-12 text-left"
                          : "my-auto flex mr-3 text-sm w-12 text-left"
                      }`}
                    >
                      € {product.price}
                    </p>
                    <p
                      className={`${
                        loggedInUser?._id === foundUser._id
                          ? "my-auto flex ml-5 text-sm w-12 text-left"
                          : "my-auto flex ml-5 text-sm w-12 text-left"
                      }`}
                    >
                      {product.quantity}
                    </p>
                    <p
                      className={`${
                        loggedInUser?._id === foundUser._id
                          ? "my-auto flex ml-5 text-sm w-12 text-left"
                          : "my-auto flex ml-5 text-sm w-11 text-left"
                      }`}
                    >
                      {product.likes.length}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LikedProducts;
