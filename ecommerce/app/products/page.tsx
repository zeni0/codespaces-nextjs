import ProductList from "../ProductList";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/products', {
        cache: 'no-cache'
    });
    const products = await response.json();

    const response2 = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
        cache: 'no-cache',
    });
    const cartProducts = await response2.json();

    return (
        <div className="container mx-auto p-8">
            <h1>Products</h1>
            <ProductList products={products} initialCartProducts={cartProducts} />
        </div>
    )
}