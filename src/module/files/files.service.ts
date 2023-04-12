import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
    /**
     * Запись файла на диск
     * @param file 
     * @returns 
     */
   async create (file:  Express.Multer.File) {
        const fileName = `${uuid.v4()}.jpg`;
        const filePath = await path.join(__dirname,"..", "..", "uploads");
        const filePathDestination = await path.join(filePath, fileName);
        const filePathStatic = await path.join("uploads", fileName);
        console.log('я здесь')
        console.log(__dirname)
        if (!fs.existsSync(filePath)) {
            await fs.mkdirSync(filePath);
        }

        try {
           await fs.writeFileSync(filePathDestination,file.buffer);
        } catch (e) {
            throw new InternalServerErrorException(`Не удалось записать файл: ${e}`);
        }

        return filePathStatic;
    }
}