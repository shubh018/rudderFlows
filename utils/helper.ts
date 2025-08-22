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
        if (!line || line.trim().startsWith('#')) return line;

        const [k, ...rest] = line.split('=');
        const cleanKey = k.trim();
        const cleanVal = rest.join('=').trim();

        if (cleanKey === key) {
            found = true;
            return `${key}=${value}`;
        }

        return `${cleanKey}=${cleanVal}`;
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