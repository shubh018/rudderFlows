import * as fs from 'fs';
import * as path from 'path';

const envPath = path.resolve(process.cwd(), '.env');

export function updateEnv(key: string, value: string) {
    let envContent = '';

    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf-8');
    }

    let lines = envContent.split('\n');

    let found = false;
    lines = lines.map(line => {
        // Ignore empty/comment lines
        if (!line || line.trim().startsWith('#')) return line;

        // Split into key/value ignoring spaces around '='
        const [k, ...rest] = line.split('=');
        const cleanKey = k.trim();
        const cleanVal = rest.join('=').trim();

        if (cleanKey === key) {
            found = true;
            return `${key}=${value}`; // replace
        }

        return `${cleanKey}=${cleanVal}`; // normalize formatting
    });

    if (!found) {
        lines.push(`${key}=${value}`);
    }

    fs.writeFileSync(envPath, lines.join('\n') + '\n');
}

export function generateAuthHeader(writeKey: string): string {
    const encoded = Buffer.from(`${writeKey}:`).toString("base64");
    return `Basic ${encoded}`;
}