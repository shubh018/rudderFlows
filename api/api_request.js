var dataPlaneUrl = process.env.DATA_PLANE_URL;
var writeKey = process.env.WRITE_KEY;
console.log(process.env.DATA_PLANE_URL);
console.log(process.env.WRITE_KEY);
var SendRequest = /** @class */ (function () {
    function SendRequest() {
    }
    SendRequest.prototype.getBasicAuthHeader = function (writeKey) {
        // Username = writeKey, password = empty
        var token = Buffer.from("".concat(writeKey, ":")).toString('base64');
        return "Basic ".concat(token);
    };
    return SendRequest;
}());
