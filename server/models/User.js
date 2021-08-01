const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type:String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number, // 관리자(1), 일반유저(0) 설정
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ) {
    let user = this;

    // password가 바뀌었을 때만 암호화
    if(user.isModified('password')) {
        // 비밀번호 암호화 using bcrypt
        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) {
                return next(err);
            } else {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if(err) {
                        return next(err);
                    } else {
                        user.password = hash;
                        next();
                    }
                })
            }
            
        })
    } else {
        next();
    }
})

userSchema.methods.checkPassword = function(plainPassword, callback) {
    //plainPassword
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) {
            return callback(err);
        } else {
            callback(null, isMatch);
        }
    })
}

userSchema.methods.generateToken = function(callback) {
    let user = this;

    //jsonwebtoken을 이용해서 token 생성
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function(err, user) {
        if(err) {
            return callback(err);
        } else {
            callback(null, user);
        }
    })
}

userSchema.statics.findByToken = function(token, callback) {
    let user = this;

    //토큰을 decode -> user id가 나옴
    //jwt.verify(token, secretOrPublicKey, [options, callback])
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //decoded = user._id
        user.findOne({ "_id": decoded, "token": token}, function (err, user) {
            if(err) {
                return callback(err);
            } else {
                return callback(null, user);
            }
        })
    })

}

const User = mongoose.model('User', userSchema);

module.exports = { User }