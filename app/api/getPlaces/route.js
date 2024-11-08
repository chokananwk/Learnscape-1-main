import { NextResponse } from 'next/server';  
import { connectMongoDB } from '../../../lib/mongodb';  // แก้ path ตามโครงสร้างโปรเจค  
import Place from '../../../models/Place';  

export async function GET() {  
  try {  
    await connectMongoDB();  
    const places = await Place.find().sort({ createdAt: -1 });  
    return NextResponse.json(places);  
  } catch (error) {  
    console.error("Error fetching places:", error);  
    return NextResponse.json(  
      { error: "Failed to fetch places" },  
      { status: 500 }  
    );  
  }  
}