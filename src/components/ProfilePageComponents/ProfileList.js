const ProfileList = ({ setShowInfo, foundUser, showInfo }) => {
  return (
    <ul className="flex justify-between w-[900px] ml-10">
      <li
        onClick={() => setShowInfo("products")}
        className={`${showInfo === "products" ? "border-b" : ""} border-neutral hover:cursor-pointer hover:border-neutral-600 hover:text-neutral-600`}
      >
        Listed Products
      </li>
      <li
        onClick={() => setShowInfo("reviews")}
        className={`${showInfo === "reviews" ? "border-b" : ""} border-neutral hover:cursor-pointer hover:border-neutral-600 hover:text-neutral-600`}
      >
        Reviews of {foundUser.username}
      </li>
      <li
        onClick={() => setShowInfo("liked")}
        className={`${showInfo === "liked" ? "border-b" : ""} border-neutral hover:cursor-pointer hover:border-neutral-600 hover:text-neutral-600`}
      >
        Liked products
      </li>
    </ul>
  );
};

export default ProfileList;
