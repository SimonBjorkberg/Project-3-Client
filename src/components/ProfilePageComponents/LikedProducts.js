const LikedProducts = ({ foundUser, navigate }) => {
  return (
    <div className="text-left lg:pl-10 py-10 bg-neutral-200">
      {!foundUser.productsLiked ? (
        <p>This user has no liked products!</p>
      ) : (
        foundUser.productsLiked?.map((product) => {
          console.log("test");
          return (
            <div
              onClick={() => navigate(`/product/single/${product._id}`)}
              key={product._id}
              className="flex py-2 border-b lg:w-[900px] border-neutral hover:bg-neutral-200 hover:cursor-pointer"
            >
              <div className="avatar">
                <div className="w-16 rounded-xl">
                  <img src={product.images[0]} alt="" />
                </div>
              </div>
              <p className="my-auto ml-5 text-xl font-semibold w-44 truncate">
                {product.title}
              </p>
              <p className="my-auto ml-5 lg:block hidden text-xl w-20">${product.price}</p>
              <p className="my-auto ml-5 text-xl w-36">
                {product.quantity} item/s
              </p>
              <p className="my-auto ml-5 lg:block hidden text-xl w-20">
                {product.likes.length} Like/s
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default LikedProducts;
