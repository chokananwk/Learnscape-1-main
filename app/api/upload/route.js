import { NextResponse } from 'next/server';  
import { writeFile } from 'fs/promises';  
import path from 'path';  

export async function POST(req) {  
    try {  
        const formData = await req.formData();  
        const file = formData.get('image');  
        
        if (!file) {  
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });  
        }  

        const bytes = await file.arrayBuffer();  
        const buffer = Buffer.from(bytes);  

        // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน  
        const fileName = `${Date.now()}-${file.name}`;  
        const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);  

        // บันทึกไฟล์  
        await writeFile(filePath, buffer);  
        
        // ส่ง URL กลับไป  
        const imageUrl = `/uploads/${fileName}`;  

        return NextResponse.json({   
            message: 'File uploaded successfully',  
            imageUrl   
        });  

    } catch (error) {  
        console.error('Error uploading file:', error);  
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });  
    }  
}