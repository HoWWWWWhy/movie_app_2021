// backend server entry point

require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.dev",
});

const express = require("express");
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");

const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//application/json
app.use(express.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@boiler-plate.bj2wk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/api/hello", (req, res) => {
  res.send("Welcome");
});

app.get("/api/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 것은 Authentication이 True라는 말
  return res.status(200).json({
    success: true,
    userId: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    name: req.user.name,
    email: req.user.email,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  // send는 client에서 text형식을 받아도 될 때 사용. json은 꼭 json형식으로 받아야 될 때 사용
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    (err, userInfo) => {
      if (err) {
        return res.json({ success: false, err });
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    }
  );
});

app.post("/api/users/register", (req, res) => {
  //회원가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    //console.log(userInfo);
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({ success: true });
    }
  });
});

app.post("/api/users/login", (req, res) => {
  const user = new User(req.body);
  const email = user.email;
  const password = user.password;

  //1. 요청된 이메일이 데이터베이스에 있는지 찾기
  User.findOne({ email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        success: false,
        message: "가입되지 않은 이메일입니다.",
        err,
      });
    } else {
      //2. 비밀번호가 맞는지 확인
      userInfo.checkPassword(password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            success: false,
            message: "올바르지 않은 비밀번호입니다.",
            err,
          });
        } else {
          //3. 토큰 생성
          userInfo.generateToken((err, userInfo) => {
            if (err) {
              return res.status(400).send(err);
            } else {
              //토큰을 쿠키 또는 로컬 스토리지에 저장
              return res
                .cookie("x_auth", userInfo.token)
                .status(200)
                .json({ success: true, userId: userInfo._id });
            }
          });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
