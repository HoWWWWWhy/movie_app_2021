const { User } = require('../models/User');

let auth = (req, res, next) => {

    //인증 처리 하는 곳

    //1. client 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth;
    //2. 토큰을 복호화(Decode)하여 user를 찾는다.
    User.findByToken(token, (err, userInfo) => {
        if(err) {
            throw err;
        } else {
            if(!userInfo) {
                return res.json({ isAuth: false, error: true });
            } else {
                req.token = token;
                req.user = userInfo;
                next();
            }
        }
    })

    //3. user가 있으면 인증 성공

    //4. user가 없으면 인증 실패
}

module.exports = { auth };