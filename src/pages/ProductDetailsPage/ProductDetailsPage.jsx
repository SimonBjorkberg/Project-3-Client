import "./ProductDetailsPage.css";
import example from "../../baby-clothes.jpg"
import PreferredCategories from "../../components/PreferredCategories/PreferredCategories";



function ProductDetailsPage() {


  return (
    <div className="flex sm:flex-col md:flex-row">
        <div className="w-2/4 m-8">
          <img src={example} className="rounded m-w-fit"></img>
        </div>
        <div className="my-8 text-left text-base-100">
          <h5 className="text-3xl text-base-100 font-semibold">Title</h5>
          <hr className="w-48 mt-2 mb-6 "></hr>
          <PreferredCategories></PreferredCategories>
          <p className="mb-6 font-semibold">$ 28.00</p>
          <p>Description Description Description Description Description Description DescriptionDescription Description Description DescriptionDescription Description Description DescriptionDescription</p>
          <p className="my-4 font-semibold">Quantity</p>
          <button className="btn btn-outline bg-base-100">Add To Cart</button>

        </div>
      


      
    </div>
  );
}

export default ProductDetailsPage;
