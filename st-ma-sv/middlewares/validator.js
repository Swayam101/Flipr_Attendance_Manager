import { validationResult } from "express-validator";

import asyncWrapper from "../utils/asyncWrapper.js";

const expressValidatorMiddleware = asyncWrapper(async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  console.log(result);
  res.status(422).json({error:result.errors[0].msg});
});

export default expressValidatorMiddleware;
