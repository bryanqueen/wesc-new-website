import { NextResponse } from "next/server";

export async function GET (){
    try {
        const response = await fetch(`${process.env.BASE_API_URL}/api/programmes`)
        if(!response.ok){
            throw new Error('Failed to Fetch Programmes')
        }
        const data = await response.json();
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching programmes', error)
        return NextResponse.json({error: 'Internal Server error'}, {status: 500})
    }
}