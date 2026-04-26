exports.handler = async (event) => {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            success: true,
            message: "Lambda is working 🚀",
            method: event.requestContext?.http?.method || event.httpMethod,
            time: new Date().toISOString()
        })
    };
};