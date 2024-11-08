import mongoose from 'mongoose';  

const MONGODB_URI = process.env.MONGODB_URI;  

if (!MONGODB_URI) {  
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');  
}  

// กำหนดค่า options สำหรับการเชื่อมต่อ  
const options = {  
    useNewUrlParser: true,  
    useUnifiedTopology: true,  
    // สำหรับ MongoDB Atlas ที่ใช้ SSL  
    ssl: true,  
    // ตั้งค่า connection pool  
    maxPoolSize: 10,  
    // timeout settings  
    serverSelectionTimeoutMS: 5000,  
    socketTimeoutMS: 45000,  
};  

// ตัวแปรสำหรับเก็บสถานะการเชื่อมต่อ  
let cached = global.mongoose;  

if (!cached) {  
    cached = global.mongoose = { conn: null, promise: null };  
}  

export async function connectMongoDB() {  
    // ถ้ามีการเชื่อมต่ออยู่แล้ว ให้ใช้การเชื่อมต่อเดิม  
    if (cached.conn) {  
        return cached.conn;  
    }  

    // ถ้ากำลังเชื่อมต่ออยู่ ให้รอการเชื่อมต่อเสร็จสิ้น  
    if (!cached.promise) {  
        try {  
            // กำหนดค่า strictQuery เป็น false เพื่อป้องกัน warning  
            mongoose.set('strictQuery', false);  

            // สร้างการเชื่อมต่อใหม่  
            cached.promise = mongoose.connect(MONGODB_URI, options);  
        } catch (error) {  
            cached.promise = null;  
            throw error;  
        }  
    }  

    try {  
        cached.conn = await cached.promise;  

        // เพิ่ม event listeners สำหรับ monitor connection  
        mongoose.connection.on('connected', () => {  
            console.log('MongoDB connected successfully');  
        });  

        mongoose.connection.on('error', (err) => {  
            console.error('MongoDB connection error:', err);  
        });  

        mongoose.connection.on('disconnected', () => {  
            console.log('MongoDB disconnected');  
        });  

        // Handle process termination  
        process.on('SIGINT', async () => {  
            await mongoose.connection.close();  
            process.exit(0);  
        });  

        return cached.conn;  
    } catch (error) {  
        cached.promise = null;  
        throw error;  
    }  
}  

// เพิ่มฟังก์ชันสำหรับปิดการเชื่อมต่อ (ถ้าจำเป็น)  
export async function disconnectMongoDB() {  
    try {  
        await mongoose.connection.close();  
        cached.conn = null;  
        cached.promise = null;  
    } catch (error) {  
        console.error('Error disconnecting from MongoDB:', error);  
        throw error;  
    }  
}  

// เพิ่มฟังก์ชันสำหรับตรวจสอบสถานะการเชื่อมต่อ  
export function getConnectionStatus() {  
    return mongoose.connection.readyState;  
}