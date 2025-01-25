'use client'

import { notFound } from 'next/navigation'
import { useState, useEffect } from 'react'
import ProgrammeViewer from '@/components/programmepage/programme-viewer'

export default function ProgrammePage({ params }: { params: { id: string } }) {
    const [programme, setProgramme] = useState<any>(null)
    const [loading, setIsLoading] = useState(true)
    const [id, setId] = useState<any>(null)

    useEffect(() => {
        const unwrapParams = async () => {
            const {id} = await params
            setId(id)
        }
        unwrapParams()
    },[params])


    useEffect(() => {
        if(id){
            const fetchProgramme = async () => {
                try {
                    const response = await fetch(`/api/proxy-programme/${id}`)

                    if(!response.ok){
                        throw new Error('Failed to fetch Programme')
                    }
                    const data = await response.json()
                    setProgramme(data)
                } catch (error) {
                    console.error('Error Fetching Programme', error)
                } finally{
                    setIsLoading(false)
                }
            }
            fetchProgramme()
        }
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-pulse text-4xl text-gray-500">
                    Loading Programme...
                </div>
            </div>
        )
    }

    if (!programme) {
        return notFound()
    }

    return (
        <div>
            <ProgrammeViewer
                title={programme.title}
                description={programme.description}
                coverImage={programme.coverImage}
                content={programme.content}
                form={programme.form}
            />
        </div>
    )
}