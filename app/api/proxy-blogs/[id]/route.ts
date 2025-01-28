import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params} : {params: Promise<{id: string}> }){
    const id = (await params).id
    try {
        const response = await fetch(`${process.env.BASE_API_URL}/api/blogs/${id}`);
        if(!response.ok){
            throw new Error(`Http error! status:${response.status}`)
        }
        const data = await response.json();
        return NextResponse.json(data)

    } catch (error) {
        console.error('Error fetching Blog', error)
        return NextResponse.json({error: 'Internal Server errror'}, {status: 500})
    }
}