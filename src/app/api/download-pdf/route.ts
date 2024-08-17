import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const response = await axios.get(body.url, {
            responseType: 'arraybuffer'
        })

        const ContentTypeHeader = response.headers['content-type'];
        const ContentType = ContentTypeHeader.split('/')[1].split(';')[0];
        
        return new Response(response.data, {
            headers: {
                'Content-Type': `${ContentType}`,
            }
        });
    } catch (error) {
        let errorMessage = "Unable to fetch the document";

        return new Response(errorMessage, {
            status: 500,
            headers: {
                'Content-Type': 'text/plain',
            }
        });
    }
}
