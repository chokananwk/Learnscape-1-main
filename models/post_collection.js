import mongoose from 'mongoose';  

const placeSchema = new mongoose.Schema({  
    name: {  
        type: String,  
        required: [true, 'Please provide a name'],  
    },  
    type: {  
        type: String,  
        required: [true, 'Please provide a type'],  
    },  
    location: {  
        type: String,  
        required: [true, 'Please provide a location'],  
    },  
    experience: {  
        type: String,  
        required: [true, 'Please provide an experience'],  
    },  
    mood: {  
        type: String,  
        required: [true, 'Please provide a mood'],  
    },  
    rating: {  
        type: Number,  
        required: [true, 'Please provide a rating'],  
        min: 1,  
        max: 5  
    },  
    imageUrl: {  
        type: String,  
        default: '/default-image.jpg'  
    },  
    likes: {  
        type: Number,  
        default: 0  
    },  
    createdAt: {  
        type: Date,  
        default: Date.now  
    }  
});  

const Place = mongoose.models.Place || mongoose.model('Place', placeSchema);  

export default Place;