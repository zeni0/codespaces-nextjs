"use client"

import { useState } from 'react';
//import { Product } from '../product-data';
import Link from 'next/link';


export default function CheckoutList({ initialCartProducts }: { initialCartProducts: Product[] }) {
    const [cartProducts, setCartProducts] = useState(initialCartProducts);
    
    const totalPrice = cartProducts.reduce((acc, product) => acc + product.price, 0);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Check Out</h1>

            <ul className="space-y-4"> {/* List for cart items */}
                {cartProducts.map(product => (
                  <li key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">  
                    <Link key={product.id} href={'/products/' + product.id } className="flex">
                        <div className="relative"> {/* Added height and relative positioning */}    
                            <img src={'/' + product.imageUrl} 
                                alt="Product image" 
                                fill // Fill the container
                                className="rounded-md" // Cover the container, maintaining aspect ratio
                                width="150" 
                            />
                        </div>
                        <div class="px-4 text-center sm:text-left">
                            <div class="space-y-0.5">
                                <h3 className="text-2xl font-bold">{product.name}</h3>
                                <p>${product.price}</p>
                            </div>
                        </div>    
                    </Link>
                  </li>
                  
                ))}
            </ul>
            {cartProducts.length > 0 && (
                <p className="p-4">
                    Total Price: ${totalPrice}
                </p>
            )}
        </div>
    )    
}