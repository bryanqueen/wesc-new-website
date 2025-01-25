import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, {params} : {params: {id: string} }){
    const id = params.id
    try {
        const response = await fetch(`${process.env.BASE_API_URL}/api/programmes/${id}`)

        if(!response.ok){
            throw new Error(`Http error! status:${response.status}`)
        }
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
       console.error('Error fetching Programme', error)
       return NextResponse.json({error: 'Internal Server error'}, {status: 500}) 
    }
}