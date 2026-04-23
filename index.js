let users = {}; // in-memory storage (temporary)

exports.handler = async (event) => {
    const method = event.requestContext.http.method;

    let body = {};
    try {
        body = JSON.parse(event.body || "{}");
    } catch (e) {}

    // CREATE
    if (method === "POST") {
        users[body.id] = body.name;
        return response(200, { message: "User created", users });
    }

    // READ
    if (method === "GET") {
        return response(200, { users });
    }

    // UPDATE
    if (method === "PUT") {
        if (!users[body.id]) {
            return response(404, { message: "User not found" });
        }
        users[body.id] = body.name;
        return response(200, { message: "User updated", users });
    }

    // DELETE
    if (method === "DELETE") {
        delete users[body.id];
        return response(200, { message: "User deleted", users });
    }

    return response(400, { message: "Invalid request" });
};

function response(statusCode, data) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
}