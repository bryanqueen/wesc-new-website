import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
      const body = await request.json()
      console.log('Proxy received body:', body)
  
      const response = await fetch(`${process.env.BASE_API_URL}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upstream error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
      }
  
      const data = await response.json()
      return NextResponse.json(data, { status: response.status })
    } catch (error) {
      console.error("Error in proxy POST /api/applications:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  }