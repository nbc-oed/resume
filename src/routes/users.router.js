import express from "express";
import { prisma } from "../utils/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// 회원가입 API
router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, checkPassword, name, age, college, gender } =
      req.body;
    if (password !== checkPassword)
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    if (password.length < 6)
      return res
        .status(401)
        .json({ message: "비밀번호는 6자 이상으로 만들어주세요." });

    const isExistEmail = await prisma.users.findUnique({
      where: { email },
    });
    if (isExistEmail)
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const upperGender = gender ? gender.toUpperCase() : gender;

    const user = await prisma.users.create({
      data: {
        email: email,
        password: hashedPassword,
        kind: "USER",
      },
    });

    const userInfo = await prisma.userInfos.create({
      data: {
        userId: user.userId,
        name,
        age,
        college,
        gender: upperGender,
      },
    });

    return res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      data: {
        email: user.email,
        detail: userInfo,
      },
    });
  } catch (err) {
    next(err);
  }
});

// 로그인 API
router.post("/sign-in", async (req, res, next) => {});

// 유저(본인) 정보 조회 API
router.get("/users", async (req, res, next) => {});

export default router;
