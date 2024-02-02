import express from "express";
import { prisma } from "../utils/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 이력서 목록 조회 API
router.get("/resumes", async (req, res, next) => {
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

  if (!resumes[0])
    return res.status(404).json({ message: "이력서 데이터가 없습니다." });

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
router.get("/resumes/:resumeId", async (req, res, next) => {
  const { resumeId } = req.params;
  const resume = await prisma.resumes.findFirst({
    where: { resumeId: +resumeId },
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
              age: true,
            },
          },
        },
      },
    },
  });

  if (!resume)
    return res.status(404).json({ message: "이력서 데이터가 없습니다." });
  return res.status(200).json({ data: resume });
});

// 이력서 수정 API
router.put("/resumes/:resumeId", authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { resumeId } = req.params;
    let { title, content, status } = req.body;
    if (!title && !content && !status)
      return res.status(400).json({ message: "수정할 값을 입력해주세요." });

    const resume = await prisma.resumes.findFirst({
      where: { resumeId: +resumeId },
    });
    if (!resume)
      return res.status(400).json({ message: "이력서가 존재하지 않습니다." });
    if (+userId !== resume.userId)
      return res
        .status(401)
        .json({ message: "본인의 이력서만 수정할 수 있습니다." });

    title = title ? title : resume.title;
    content = content ? content : resume.content;
    status = status ? status : resume.status;

    await prisma.resumes.update({
      where: { resumeId: +resumeId },
      data: { title, content, status },
    });

    return res.status(201).json({ message: "수정이 완료되었습니다." });
  } catch (err) {
    next(err);
  }
});

// 이력서 삭제 API
router.delete("/resumes/:resumeId", authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { resumeId } = req.params;

    const resume = await prisma.resumes.findFirst({
      where: { resumeId: +resumeId },
    });
    if (!resume)
      return res.status(400).json({ message: "이력서가 존재하지 않습니다." });
    if (+userId !== resume.userId)
      return res
        .status(401)
        .json({ message: "본인의 이력서만 삭제할 수 있습니다." });

    await prisma.resumes.delete({
      where: { resumeId: +resumeId },
    });

    return res.status(201).json({ message: "삭제가 완료되었습니다." });
  } catch (err) {
    next(err);
  }
});

export default router;
