import express from "express";
import { prisma } from "../utils/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 이력서 목록 조회 API
router.get("/resumes", async (req, res, next) => {
  //   const { orderKey, orderValue } = URLSearchParams;
  const resumes = await prisma.resumes.findMany({
    select: {
      resumeId: true,
      title: true,
      content: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          userInfo: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json({ data: resumes });
});

// 이력서 생성 API
router.post("/resumes", authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { title, content } = req.body;

    const resume = await prisma.resumes.create({
      data: {
        userId: +userId,
        title,
        content,
        status: "APPLY",
      },
    });

    return res.status(201).json({ data: resume });
  } catch (err) {
    next(err);
  }
});

// 이력서 상세 조회 API
router.get("/resumes/:resumId", async (req, res, next) => {});

// 이력서 수정 API
router.put("/resumes/:resumId", authMiddleware, async (req, res, next) => {});

// 이력서 삭제 API
router.delete(
  "/resumes/:resumId",
  authMiddleware,
  async (req, res, next) => {}
);

export default router;
