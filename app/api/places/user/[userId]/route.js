import { NextResponse } from 'next/server';  
import { connectMongoDB } from '@/lib/mongodb';  
import Place from '@/models/Place';  
import { getServerSession } from 'next-auth/next';  
import { authOptions } from '@/app/api/auth/[...nextauth]/route';  
 

export async function GET(request, { params }) {  
    try {  
        // ตรวจสอบ authentication  
        const session = await getServerSession(authOptions);  
        if (!session) {  
            return NextResponse.json(  
                { error: "Unauthorized" },  
                { status: 401 }  
            );  
        }  

        const userId = params.userId;  

        // ตรวจสอบว่า user พยายามเข้าถึงข้อมูลของตัวเองหรือไม่  
        if (session.user.id !== userId) {  
            return NextResponse.json(  
                { error: "Access denied" },  
                { status: 403 }  
            );  
        }  

        await connectMongoDB();  

        // ดึงข้อมูล places ของ user  
        const userPlaces = await Place.find({ userId })  
            .sort({ createdAt: -1 })  
            .populate('userId', 'name email'); // ถ้าต้องการข้อมูล user เพิ่มเติม  

        return NextResponse.json(userPlaces);  

    } catch (error) {  
        console.error("Error fetching user places:", error);  
        return NextResponse.json(  
            { error: "Failed to fetch places" },  
            { status: 500 }  
        );  
    }  
}