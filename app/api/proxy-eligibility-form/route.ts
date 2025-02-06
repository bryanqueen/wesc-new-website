import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(`${process.env.BASE_API_URL}/api/eligibility-form`)
        if(!response) {
            throw new Error('Failed to fetch Eligibility form')
        }
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching eligibility form', error)
        return NextResponse.json({error: 'Internal Server error'}, {status: 500})
    }
}