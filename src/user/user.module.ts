import { Module } from '@nestjs/common';
import { Bcrypt } from 'src/lib/Bcrypt';

@Module({
    imports: [Bcrypt],
})
export class UserModule { }
