import { Transform } from 'node:stream';
export const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const data = chunk.toString().toUpperCase();
        this.push(data);
        callback();
    }
});