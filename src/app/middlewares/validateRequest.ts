import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../../shared/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;

// import { NextFunction, Request, Response } from "express";
// import { AnyZodObject } from "zod";

// const validateRequest =
//   (schema: AnyZodObject) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//       });
//       return next();
//     } catch (err) {
//       next(err);
//     }
//   };

// export default validateRequest;
