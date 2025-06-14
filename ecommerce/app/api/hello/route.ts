export async function GET() {
    return new Response('Hello, from route handler', {
        status: 200,
    })
}

export async function POST() {
    return new Response('Hello, from POST route handler', {
        status: 200,
    })
}