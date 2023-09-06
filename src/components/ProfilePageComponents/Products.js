import scrollToTop from "../../utils/ScrollToTop";
import { useNavigate } from 'react-router-dom'

const Products = ({
  foundUser,
  loggedInUser,
  recentProducts,
  showMore,
  setShowMore,
}) => {
const navigate = useNavigate()
  return (
    <div className="text-left ml-10 pt-10">
      {!foundUser?.products?.length ? (
        <p>This user has no listed products!</p>
      ) : (
        recentProducts?.map((product) => {
          return (
            <div
              key={product._id}
              className="flex py-2 border-b w-[900px] border-neutral hover:bg-neutral-200 hover:cursor-pointer"
              onClick={() => navigate(`/product/single/${product._id}`)}
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
              <div className="flex ml-auto"
              onClick={(e) => e.stopPropagation()}>
                <button className="mr-2 h-fit my-auto p-2 bg-neutral-400 z-20">Edit</button>
                <button className="h-fit my-auto p-2 bg-neutral-400 mr-4 z-20">Delete</button>
              </div>
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
              scrollToTop();
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
