import "./SellPage.css";
import { useState } from "react";


function SellPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleImages = (e) => setImages(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleQuantity = (e) => setQuantity(e.target.value);

  return (
    <div>
      <h1 className="my-4 text-2xl">Sell</h1>

    <form
      className="flex flex-col w-[400px] mx-auto"
      // onSubmit={}
    >
      <label>Title</label>
      <input
        className="p-2 rounded-md border border-neutral-400"
        type="text"
        name="title"
        value={title}
        onChange={handleTitle}
      />

      <label>Description</label>
      <input
        className="p-2 rounded-md border border-neutral-400"
        type="text"
        name="description"
        value={description}
        onChange={handleDescription}
      />

      <label>Images</label>
      <input
        className="p-2 rounded-md border border-neutral-400"
        type="file"
        name="images"
        value={images}
        onChange={handleImages}
      />

      <label>Price</label>
            <input
              className="p-2 rounded-md border border-neutral-400"
              type="number"
              name="price"
              value={price}
              onChange={handlePrice}
            /> 

      <label>Quantity</label>
            <input
              className="p-2 rounded-md border border-neutral-400"
              type="number"
              name="quantity"
              value={quantity}
              onChange={handleQuantity}
            />
      <button className="w-1/2 bg-teal-600 mx-auto py-2 rounded-sm hover:bg-teal-500 mt-4"  type="submit">Sell</button>
    </form>
    </div>
  );
}

export default SellPage;
