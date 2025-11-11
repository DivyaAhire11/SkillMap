const responder = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,  // true for success codes
        message,
        data
    });
};

export default responder;
