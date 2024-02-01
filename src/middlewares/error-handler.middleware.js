export default (err, req, res, next) => {
  console.log(err.name, ":", err.message);

  // if (err.name === "CastError") {
  //   return res.status(404).json({ message: "상품이 존재하지 않습니다." });
  // } // 모든 CastError 처리를 이 message로 할 수 없음 (일단보류)

  if (err.name === "ValidationError" || "PrismaClientValidationError") {
    return res.status(403).json({ message: "올바른 값을 입력해주세요." });
  }

  if (err.name === "SyntaxError") {
    return res.status(400).json({ message: "올바른 데이터를 전달해주세요." });
  }

  return res
    .status(500)
    .json({ errorMessage: "서버 내부 에러가 발생했습니다." });
};
