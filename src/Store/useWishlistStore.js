import { create } from "zustand";
import { myAxios } from "../Api/myAxios";
import { toast } from "react-toastify";

export const WishlistStore = create( (set , get) => ({

    WishlistProducts : [],

    setWishlistProducts : (newProds) => set({ WishlistProducts : newProds }),

    numOfWishlist : 0,

    setNumOfWishlist : (newNum) => set( { numOfWishlist : newNum } ),

    isLoading : false,

    deleteLoad : null,


    

    getWishlist : () => {

        set({
            isLoading : true
        })

        myAxios.get('wishlist')

        .then( (res) => {

            set({
                WishlistProducts : res.data.data,
                
                numOfWishlist : res.data.count ,

                isLoading : false
            })

        } )
        .catch( (err) => {
            console.log(err)

            set({
                WishlistProducts : [],

                numOfWishlist : 0 ,

                isLoading : false
            })

        } )

    },


    addToWishlist : (id) => {

        myAxios.post('wishlist' , id )

        .then( () => {

            localStorage.setItem(`isWishlist${id.productId}` , true )

            toast.success("Product Added To Wishlist")

            // to call getWishlist function
            get().getWishlist()

        } )
        .catch( (err) => {
            console.log(err)

            toast.error("Oops! Error Happen")

        } )

    },


    removeItem : (productId) => {

        set({
            deleteLoad : productId
        })

      myAxios.delete(`wishlist/${productId}`)

      .then( () => {

      // console.log(res)

      set({
            deleteLoad : null
      })
    
      toast.success('Product Removed From Wishlist')

      localStorage.removeItem(`isWishlist${productId}`)

      get().getWishlist()

    } )
    .catch( (err) => {

     console.log(err)

     set({
        deleteLoad : null
     })

      toast.error("Oops! Error Happen")

    } )

    }




} ))