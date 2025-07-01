"use client"

import { useState } from 'react';
import { Product } from '../product-data';
import Link from 'next/link';


export default function ShoppingCartList({ initialCartProducts }: { initialCartProducts: Product[] }) {
    const [cartProducts, setCartProducts] = useState(initialCartProducts);

    // REMOVE from cart
    async function removeFromCart(productId: string) {
        const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
            method: 'DELETE',
            body: JSON.stringify({
                productId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const updatedCartProducts = await response.json();
        setCartProducts(updatedCartProducts);
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <ul className="space-y-4"> {/* List for cart items */}
                {cartProducts.map(product => (
                  <li key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">  
                    <Link key={product.id} href={'/products/' + product.id } className="flex">
                        <div className="relative"> {/* Added height and relative positioning */}    
                            <img src={'/' + product.imageUrl} 
                                alt="Product image" 
                                className="rounded-md" // Cover the container, maintaining aspect ratio
                                width="150" 
                            />
                        </div>
                        <div className="px-4 text-center sm:text-left">
                            <div className="space-y-0.5">
                                <h3 className="text-2xl font-bold">{product.name}</h3>
                                <p>${product.price}</p>
                                <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => {
                                    e.preventDefault();
                                    removeFromCart(product.id);
                                }}>Remove from Cart</button>
                            </div>
                        </div>    
                    </Link>
                  </li>
                ))}
            </ul>
            {cartProducts.length > 0 && (
                <p className="p-4">
                    <Link href='/checkout' className='text-gray-700 hover:text-black hover:underline'>Continue to Check Out</Link>
                </p>
            )}
        </div>
    )    
}