'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
//import { Product } from "./product-data";

export default function ProductList({ products, initialCartProducts = [] }: { products: Product[], initialCartProducts: Product[] }) {
    const [cartProducts, setCartProducts] = useState(initialCartProducts)
    
    // ADD to card
    async function addToCart(productId: string) {
        const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
            method: 'POST',
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

    // check if product is already in their cart
    function productIsInCart(productId: string) {
        return cartProducts.some(cp => cp.id === productId);
    }
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product =>(
                <Link 
                    key={product.id} 
                    href={"/products/" + product.id}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
                >
                <div className="flex justify-center mb-4 h-48 relative"> {/* Added height and relative positioning */}    
                    <Image 
                        src={'/' + product.imageUrl} 
                        alt="Product image" 
                        fill // Fill the container
                        className="object-cover rounded-md" // Cover the container, maintaining aspect ratio 
                    />
                </div>
                <div class="space-y-2 text-center sm:text-left">
                    <div class="space-y-0.5">  
                        <h2 className="text-xl font-semibold mb-2 text-gray-400 hover:text-black">{product.name}</h2>
                        <p className="text-gray-600">${product.price}</p>
                    </div>  
                    {productIsInCart(product.id)
                    ? (
                        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => {
                            e.preventDefault();
                            removeFromCart(product.id);
                        }}>Remove from Cart</button>
                    ) : (
                        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => {
                            e.preventDefault();
                            addToCart(product.id);
                        }}>Add to Cart</button>
                    )}
                </div>    
                </Link>
            ))}
        </div>
    )
}