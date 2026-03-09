

export const handleError = (error, req, res, next) => {
     const statusCode = error.statusCode || 500
     const message = error.message || "Internal server error"

        res.status(statusCode).json({
        message: message,
        })
}

