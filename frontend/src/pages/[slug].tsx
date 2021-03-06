import axios from "axios";
import { SimpleGrid } from "@chakra-ui/react";
import MenuItem from "../components/MenuItem";
import {useRouter} from 'next/router'
import {ObjectId} from 'mongodb'

import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { addToCart } from "../context/cartReducer";

interface itemObj {
  name: string,
  size: string,
  image: string,
  _id: ObjectId
}
interface props {
  pizzas : itemObj[]
}

const Item = ({ items }: props) => { 
  const { dispatch, cart } = useContext(CartContext);
  const addToCartHandler = (item: object) => {
    dispatch(addToCart(item));
  };
  return (
    <SimpleGrid columns={{base: 1, md: 2}} spacingX="20px" spacingY="20px" alignContent={"center"} marginTop={'20px'}>
      {items.map((item) => {
        return (
          <MenuItem
            name={item.name}
            sizes={item.size}
            image={item.image}
            addToCart={addToCartHandler}
            id={item._id}
            key={JSON.stringify(item._id)}
          />
        );
      })}
    </SimpleGrid>
  );
};

export const getStaticPaths = async () => {
  const pathList = ['pizza', 'sides', 'drinks']
  const paths = [
  ];
  pathList.forEach((item) => {paths.push(`/${item}`)})
  console.log(pathList)
  return { paths, fallback: false };
}

export async function getStaticProps({params}) {

  const { slug } = params;

  try {
     const response= await axios.get(`http://localhost:3001/items/${slug}`);
     return response? { props: { items: response.data} } : { notFound: true };
   } catch (error) {
     console.error(error);
     return { notFound: true };
   }
  // if (!response) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }

}

export default Item;
