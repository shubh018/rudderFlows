const dataPlaneUrl = process.env.DATA_PLANE_URL;
const writeKey = process.env.WRITE_KEY;

console.log(process.env.DATA_PLANE_URL);
console.log(process.env.WRITE_KEY);

class SendRequest{

    getBasicAuthHeader(writeKey: string): string {
    const token = Buffer.from(`${writeKey}:`).toString('base64');
    return `Basic ${token}`;
}
}