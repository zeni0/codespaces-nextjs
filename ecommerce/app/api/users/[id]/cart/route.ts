import { products } from '@/app/product-data';
import { NextRequest } from 'next/server';
import { connectToDb } from '@/app/api/db';

// create new type, key=string, value=array of strings
type ShoppingCart = Record<string, string[]>;

const carts: ShoppingCart = {
    '1': ['123', '234'],
    '2': ['345', '456'],
    '3': ['234'],
}

type Params = {
    id: string;
}

/* RETRIEVE products */
export async function GET(request: NextRequest, { params }: { params: Params }) {
    const { db } = await connectToDb();
    // userId from url params
    const userId = params.id;
    // using userId to fetch the array of productIds
    //const productIds = carts[userId];
    const userCart = await db.collection('carts').findOne({ userId });
    // if user has no products, return empty array
    if (!userCart) {
        return new Response(JSON.stringify([]), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    // map through productIds
    //const cartProducts = productIds.map(id => products.find(p => p.id === id));
    const cartIds = userCart.cartIds
    console.log(userCart, "usercart")
    const cartProducts = await db.collection('products').find({ id: { $in: cartIds } }).toArray();

    return new Response(JSON.stringify(cartProducts), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

type CartBody = { 
    productId: string;
}

/* ADD product */
export async function POST(request: NextRequest, { params }: { params: Params }) {
    const { db } = await connectToDb();
    const userId = params.id
    // Promise, await for request
    const body: CartBody = await request.json();
    const productId = body.productId;
    
    // check userId exists then concat new product else add product for new user
    const updatedCart = await db.collection('carts').findOneAndUpdate(
        { userId },
        { $push: { cartIds: productId }},
        { upsert: true, returnDocument: 'after' }
    )
    //carts[userId] = carts[userId] ? carts[userId].concat(productId) : [productId];
    const cartProducts = await db.collection('products').find({ id: { $in: updatedCart.cartIds } }).toArray()
    //const cartProducts = carts[userId].map(id => products.find(p => p.id === id));

    return new Response(JSON.stringify(cartProducts), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// REMOVE product
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
    const { db } = await connectToDb();
    const userId = params.id
    // Promise, await for request
    const body: CartBody = await request.json();
    const productIdRemove = body.productId;

    const updatedCart = await db.collection('carts').findOneAndUpdate(
        { userId },
        { $pull: { cartIds: productIdRemove }},
        { returnDocument: 'after' }
    )
    // check user and remove from user's cart
    //carts[userId] = carts[userId] ? carts[userId].filter(p => p !== productIdRemove) : [];
    if (!updatedCart) {
        return new Response(JSON.stringify([]), {
            status: 202,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    const cartProducts = await db.collection('products').find({ id: { $in: updatedCart.cartIds } }).toArray()
    //const cartProducts = carts[userId].map(id => products.find(p => p.id === id));

    return new Response(JSON.stringify(cartProducts), {
        status: 202,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}