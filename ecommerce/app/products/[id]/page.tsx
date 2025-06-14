import NotFoundPage from '@/app/not-found';
import { products } from  '@/app/product-data';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    //const product = products.find(p => p.id === params.id)
    const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/products/' + params.id);
    const product = await response.json();

    if (!product) {
        return <NotFoundPage />
    }
    
    return (
        <>
        <div className='container mx-auto p-8 flex flex-col md:flex-row'>
            <div className='md:w-1/2 mb-4 md:mb-0 md:mr-8'>
                <img 
                src={'/' + product.imageUrl} 
                alt="Product image"
                className='w-full h-auto rounded-lg shadow-md' />
            </div>
            <div className='md:w-1/2'>
                <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
                <p className='text-2xl text-gray-600 mb-6'>${product.price}</p>
                <h3 className='text-2xl font-semibold mb-2'>Description</h3>
                <p className='text-gray-700'>{product.description}</p>
            </div>
        </div>
        </>
    )
}