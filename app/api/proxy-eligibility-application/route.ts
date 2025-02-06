import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const body = await request.json()
        console.log('Proxy recieved body', body)

        const response = await fetch(`${process.env.BASE_API_URL}/api/eligibility-applications`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)
        })

        if(!response) {
            throw new Error('Failed to post eligibility application')
        }
        const data = await response.json()
        return NextResponse.json(data, {status: response.status})
    } catch (error) {
        console.error('Error in proxy eligibility api/eligibility-application:', error)
        return NextResponse.json({error: 'Internal Server error'}, {status: 500})
    }
}