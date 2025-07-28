import { Request, Response, NextFunction } from "express";
import { AnyObjectSchema } from "yup";
import { error } from "../tools/result";




export function validateMiddleware(schema: AnyObjectSchema) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			req.body = await schema.validate(req.body, {
				abortEarly: false,
				stripUnknown: true,
			});
			next();
		} catch (err) {
			console.log(err);
            next(error(`${err}`))
		}
	};
}