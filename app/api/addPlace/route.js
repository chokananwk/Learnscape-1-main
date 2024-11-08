import { NextResponse } from 'next/server';  
import { connectMongoDB } from '../../../lib/mongodb';  
import Place from '../../../models/Place';  

// Validation function  
const validatePlaceData = (data) => {  
    const errors = [];  
    
    // Required fields  
    const requiredFields = ['name', 'type', 'location'];  
    requiredFields.forEach(field => {  
        if (!data[field]) {  
            errors.push(`${field} is required`);  
        }  
    });  

    // Name validation  
    if (data.name && (data.name.length < 2 || data.name.length > 100)) {  
        errors.push('Name must be between 2 and 100 characters');  
    }  

    // Type validation  
    const validTypes = ['restaurant', 'cafe', 'hotel', 'attraction', 'other'];  
    if (data.type && !validTypes.includes(data.type)) {  
        errors.push('Invalid place type');  
    }  

    // Rating validation  
    if (data.rating && (data.rating < 1 || data.rating > 5)) {  
        errors.push('Rating must be between 1 and 5');  
    }  

    // Image URL validation (basic)  
    if (data.imageUrl && !data.imageUrl.startsWith('/uploads/')) {  
        errors.push('Invalid image URL');  
    }  

    return errors;  
};  

// Sanitize data  
const sanitizePlaceData = (data) => {  
    return {  
        name: data.name?.trim(),  
        type: data.type?.toLowerCase(),  
        location: data.location?.trim(),  
        experience: data.experience?.trim(),  
        mood: data.mood?.trim(),  
        rating: Number(data.rating) || 5,  
        imageUrl: data.imageUrl,  
        createdAt: new Date(),  
        updatedAt: new Date()  
    };  
};  

export async function POST(req) {  
    try {  
        // Parse request body  
        const rawData = await req.json();  
        
        // Validate data  
        const validationErrors = validatePlaceData(rawData);  
        if (validationErrors.length > 0) {  
            return NextResponse.json({  
                error: 'Validation failed',  
                details: validationErrors  
            }, { status: 400 });  
        }  

        // Sanitize data  
        const placeData = sanitizePlaceData(rawData);  

        // Connect to MongoDB  
        await connectMongoDB();  

        // Check for duplicate place  
        const existingPlace = await Place.findOne({  
            name: placeData.name,  
            location: placeData.location  
        });  

        if (existingPlace) {  
            return NextResponse.json({  
                error: 'Place already exists',  
                details: 'A place with this name and location already exists'  
            }, { status: 409 });  
        }  

        // Create new place  
        const newPlace = await Place.create(placeData);  

        // Return success response  
        return NextResponse.json({  
            message: "Place added successfully",  
            data: newPlace  
        }, { status: 201 });  

    } catch (error) {  
        console.error("Error adding place:", error);  

        // Handle different types of errors  
        if (error.name === 'ValidationError') {  
            return NextResponse.json({  
                error: 'Validation Error',  
                details: Object.values(error.errors).map(err => err.message)  
            }, { status: 400 });  
        }  

        if (error.name === 'MongoServerError' && error.code === 11000) {  
            return NextResponse.json({  
                error: 'Duplicate Entry',  
                details: 'This place already exists'  
            }, { status: 409 });  
        }  

        // Generic error  
        return NextResponse.json({  
            error: "Failed to add place",  
            details: error.message  
        }, { status: 500 });  
    }  
}  

// GET endpoint to fetch all places  
export async function GET() {  
    try {  
        await connectMongoDB();  
        const places = await Place.find({})  
            .sort({ createdAt: -1 }); // Latest first  

        return NextResponse.json({  
            data: places  
        });  

    } catch (error) {  
        console.error("Error fetching places:", error);  
        return NextResponse.json({  
            error: "Failed to fetch places",  
            details: error.message  
        }, { status: 500 });  
    }  
}  

// DELETE endpoint  
export async function DELETE(req) {  
    try {  
        const { id } = await req.json();  
        
        if (!id) {  
            return NextResponse.json({  
                error: 'Place ID is required'  
            }, { status: 400 });  
        }  

        await connectMongoDB();  
        
        const place = await Place.findByIdAndDelete(id);  
        
        if (!place) {  
            return NextResponse.json({  
                error: 'Place not found'  
            }, { status: 404 });  
        }  

        return NextResponse.json({  
            message: "Place deleted successfully"  
        });  

    } catch (error) {  
        console.error("Error deleting place:", error);  
        return NextResponse.json({  
            error: "Failed to delete place",  
            details: error.message  
        }, { status: 500 });  
    }  
}