import { NextResponse } from 'next/server';  
import { connectMongoDB } from '@/lib/mongodb';  
import Place from '@/models/Place';  
import { getServerSession } from 'next-auth/next';  
import { authOptions } from '@/app/api/auth/[...nextauth]/route';  

// Get all places (public)  
export async function GET() {  
    try {  
        await connectMongoDB();  
        const places = await Place.find()  
            .sort({ createdAt: -1 })  
            .populate('userId', 'name email');  
        
        return NextResponse.json(places);  
    } catch (error) {  
        console.error("Error fetching places:", error);  
        return NextResponse.json(  
            { error: "Failed to fetch places" },  
            { status: 500 }  
        );  
    }  
}  

// Get user's places  
export async function GET(request) {  
    try {  
        const session = await getServerSession(authOptions);  
        if (!session) {  
            return NextResponse.json(  
                { error: "Unauthorized" },  
                { status: 401 }  
            );  
        }  

        const userId = session.user.id;  
        await connectMongoDB();  

        const userPlaces = await Place.find({ userId })  
            .sort({ createdAt: -1 })  
            .populate('userId', 'name email');  

        return NextResponse.json(userPlaces);  

    } catch (error) {  
        console.error("Error fetching user places:", error);  
        return NextResponse.json(  
            { error: "Failed to fetch places" },  
            { status: 500 }  
        );  
    }  
}  