import React, { useEffect, useState } from 'react'
import axios from 'axios'
 export default function useCategory() {
    const [categories,setCategories]=useState([])
     
    //getcatgory
    const getCategoires=async()=>{
        try {
            const {data}=await axios.get(`${import.meta.env.VITE_API}/category/get-category`)
            setCategories(data?.categories)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCategoires();
    },[]);
    return categories;
}


