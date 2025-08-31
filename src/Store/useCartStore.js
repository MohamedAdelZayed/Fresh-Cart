import { toast } from "react-toastify";
import { create } from "zustand";
import { myAxios } from './../Api/myAxios';

export const CartStore = create( (set , get) => ({


    CardProducts : [],

    addLoad : null,

    setCardProducts : (newProducts) => set( { CardProducts : newProducts } ),

    isLoading : false,

    setLoading : (newVal) => set( { isLoading : newVal } ),

    numOfCartItems : 0,

    setNumOfCartItems : (newNum) => set( { numOfCartItems : newNum } ),

    totalCartPrice : 0,

    setTotalCartPrice : (newPrice) => set({ totalCartPrice : newPrice }),

    cartId : null,

    
    getUserCart : () => {

      set({
            isLoading : true
      })

    myAxios.get('cart')

    .then( (res) =>{

      set({

           numOfCartItems : res.data.numOfCartItems,

           totalCartPrice : res.data.data.totalCartPrice,

           isLoading : false,

           CardProducts : res.data.data.products,

           cartId : res.data.cartId

      })
      

    } )
    .catch( (err) =>{
    
      console.log(err)

      set({
            isLoading : false,
            CardProducts : []
      })
    
    } )

    },


     addToCart : (id) => {
    
        set({
          addLoad : id.productId
        })

        myAxios.post('cart' , id )
    
        .then( (res) => {
    
          set({

            addLoad : null,

            totalCartPrice  : res.data.data.totalCartPrice
          
          })
        
          toast.success("Product Added To Cart"),
           
        //  to call getUserCart function
          get().getUserCart()
    
        } )
        .catch( (err) => {
        
          console.log(err)

          set({
            addLoad : null
          })
    
          toast.error('Ooops! Error Happen')
    
        } )
    
    },




    



})  )