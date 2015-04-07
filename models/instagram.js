var mongoose = require( 'mongoose' );

var instagramSchema = mongoose.Schema({
        type: String,
        tags: [],
        caption: {
            created_time: String,
            text: String,
            from: {
                username: String,
                id: String
            },
            id: String
        },
        likes: {
            count: Number,
            data: [{
                username: String,
                full_name: String,
                id: String,
                profile_picture: String
            }]
        },        
        link: String,
        user: {
            username: String,
            profile_picture: String,
            id: String,
            full_name: String
        },
        created_time: String,
        images: {
            low_resolution: {
                url: String,
                width: Number,
                height: Number
            },
            thumbnail: {
                url: String,
                width: Number,
                height: Number
            },
            standard_resolution: {
                url: String,
                width: Number,
                height: Number
            }
        },
        id: String,
        location: {
        	longitude: Number, 
        	latitude: Number
        },
        blocked: Boolean
    });


var blocked_users = [
    // 'erickseban', 
    // 'marina8k'
];

instagramSchema.pre('save', function (next) {
    if ( this.user ) {
        if ( blocked_users.indexOf(this.user.username) > -1) {
            this.blocked = true;
        }
    }
  next();
});

 
module.exports = mongoose.model('Instagram', instagramSchema);