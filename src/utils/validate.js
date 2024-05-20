import { AppError } from "./error.handles.js"



export const validate = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(
			{
				body: req.body,
				params: req.params,
				query: req.query,
			},
			{ abortEarly: false }
		)
		if (error) {
			throw new AppError(
				error.details.map((d) => d.message),
				400
			)
		}
		next()
	}
}