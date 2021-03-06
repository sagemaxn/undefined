import React, { useContext, useState, useEffect } from "react";
import Link from 'next/link'
import {Button, Flex, List, ListItem, Text, Heading} from '@chakra-ui/react'
import { CartContext } from "../../context/CartContext";
import Cart from '../../components/Cart'
import { removeFromCart, editCartQuantity } from "../../context/cartReducer";

const cart = () => {
    
    const {cart, dispatch} = useContext(CartContext)
    const [subtotal, setSubtotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setSubtotal(cart.totalAmount)
        let newTax = Math.round(cart.totalAmount * .09 * 1e2)/ 1e2
        setTax(newTax)
        setTotal(cart.totalAmount + newTax)
    },[cart.totalItems])

    const removeFromCartHandler = (item: object) => {
        dispatch(removeFromCart(item));
      };
    const editCartQuantityHandler = (item: object) => {
        dispatch(editCartQuantity(item))
    }
    if(cart.cart < 1){
        return <Heading>Your cart is empty!</Heading>
    }
    return (<>
        <Flex direction="column" margin="auto" w="600px">      
        <Cart cart={cart} removeFromCart={removeFromCartHandler} editCartItem={editCartQuantityHandler}></Cart>
        <Flex justifyContent="flex-end" direction="row">
        <List direction="column">
        <ListItem>Subtotal ${subtotal.toFixed(2)}
        </ListItem>
        <ListItem>
              Tax: ${tax.toFixed(2)}
              </ListItem>
              <ListItem fontWeight="bold">     
              Total ${total.toFixed(2)}
              </ListItem> 
        </List>      
        </Flex>
        <Link href="/cart/checkout">
        <Button type="submit" data-cy="checkout" colorScheme='red'>Checkout</Button>
        </Link>

        </Flex>
    </>
    )
}

export default cart

