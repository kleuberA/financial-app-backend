import bcrypt from 'bcrypt';
export class Bcrypt {
    async hash(password: string) {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }

    async compare(password: string, hash: string) {
        return password === hash;
    }
}