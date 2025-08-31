import { create } from "zustand";

export const TokenStore = create((set) => ({

    userToken : localStorage.getItem("userTkn") || null,

    setUserToken : (tkn) => set( {userToken : tkn} )


}) )