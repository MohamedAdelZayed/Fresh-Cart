import { FaStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

import LoaderScreen from "./../LoaderScreen/LoaderScreen";
import useProducts from "../../CustomHooks/useProducts";
import { Link } from "react-router-dom";
import { CartStore } from "./../../Store/useCartStore";

import { RiLoader2Line } from "react-icons/ri";
import { WishlistStore } from "../../Store/useWishlistStore";

export default function RecentProducts() {
  const { data, isLoading } = useProducts("-ratingsAverage");

  const recentData = [...(data?.data?.data || [])].reverse();

  const { addToCart, addLoad } = CartStore();

  const { addToWishlist, removeItem, WishlistProducts } = WishlistStore();

  async function handleAddToCart(productId) {
    const id = {
      productId: productId,
    };

    await addToCart(id);
  }

  async function handleAddToWishlist(id) {
    const productId = {
      productId: id,
    };

    await addToWishlist(productId);
  }

  if (isLoading === true) {
    return <LoaderScreen></LoaderScreen>;
  }

  return (
    <>
      <div>
        <h1 className=" font-bold capitalize my-4 text-xl  lg:text-2xl text-start text-emerald-500">
          shop recent products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {recentData?.map((prod) => {
            return (
              <>
                <div key={prod._id}
                  className="flex flex-col justify-between bg-white rounded-lg shadow-md py-1 mt-4 group cursor-pointer"
                >
                  <Link
                    to={`/productDetails/${prod._id}`}
                    className="flex-1 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative rounded-md overflow-hidden">
                      <img
                        src={prod.imageCover}
                        alt={prod.title}
                        className="w-full"
                      />
                      <div className="absolute inset-0 rounded-md group-hover:bg-black/20 transition-all duration-300"></div>
                    </div>

                    {/* Category */}
                    <h3 className="text-emerald-600 mt-2 mb-1 text-center text-sm">
                      {prod.category.name}
                    </h3>

                    {/* Title */}
                    <h2 className="mb-1 font-semibold text-center mt-2 text-base line-clamp-2 px-2">
                      {prod.title.split(" ", 2).join(" ")}
                    </h2>

                    {/* Price + Rating */}
                    <div className="flex justify-between items-center py-2 my-2 px-4 mt-auto">
                      <div className="flex gap-1">
                        {prod.priceAfterDiscount ? (
                          <p className="text-base font-bold text-gray-700">
                            {prod.priceAfterDiscount}{" "}
                            <span className="font-semibold text-sm">EGP</span>
                            <span className="text-gray-500 md:text-sm text-xs font-semibold line-through ml-1">
                              {prod.price}
                            </span>
                          </p>
                        ) : (
                          <p className="text-base font-bold text-gray-700">
                            {prod.price}{" "}
                            <span className="font-semibold text-sm">EGP</span>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-sm">
                        <FaStar className="text-yellow-400" />{" "}
                        {prod.ratingsAverage}
                      </div>
                    </div>

                  </Link>

                  {/* Bottom buttons */}
                  <div className="flex justify-between items-center px-4 pb-3">
                    <button
                      onClick={() => handleAddToCart(prod._id)}
                      className="cursor-pointer text-white font-semibold bg-emerald-600 py-[6px] px-[14px] rounded-lg my-2 transition-colors hover:bg-emerald-700"
                    >
                      {addLoad === prod._id ? (
                        <RiLoader2Line className="animate-spin w-6 h-6" />
                      ) : (
                        "Add To Cart"
                      )}
                    </button>

                    {WishlistProducts?.some((p) => p?._id === prod?._id) ? (
                      <FaHeart
                        onClick={() => removeItem(prod?._id)}
                        className="text-emerald-400 text-[22px] cursor-pointer hover:scale-110 transition-transform"
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => handleAddToWishlist(prod?._id)}
                        className="text-emerald-400 text-[22px] cursor-pointer hover:scale-110 transition-transform"
                      />
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
