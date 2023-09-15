const OrdersList = ({ foundUser }) => {
  console.log(foundUser.orders);
  return (
    <div className="flex lg:w-[900px] mx-auto py-10 flex-col">
      {foundUser.orders.map((order, index) => {
        return (
          <div
            className="flex flex-col w-[90%] mx-auto my-1 justify-between"
            key={order._id}
          >
            <p>Order #{index}</p>
            <div className="flex-row text-left">
              <p>Price: {order.totalAmount}</p>
              <p></p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersList;
