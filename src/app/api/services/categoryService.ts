import { existsSync, mkdirSync, writeFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { createCategory } from '../repositories/categoriesRepository';

const FILES_FOLDER = "public"
const DB_FOLDER = "uploads"

class CategoryService {
    async createCategory(title: string, file: File) {
        const fileContent = await file.arrayBuffer()
        const fileExtension = file.name.split('.')[file.name.split('.').length - 1]
        const dbpath = `/${DB_FOLDER}/${uuidv4()}.${fileExtension}`
        const path = `${FILES_FOLDER}/${dbpath}`
        if (!existsSync('public/uploads/')) {
            mkdirSync('public/uploads/')
        }
        if (file.size > 1000000) {
            throw "File exeeds the size limit of 1mb"
        }
        writeFile(path, Buffer.from(fileContent), (err) => {
            throw (err)
        })

        createCategory({ title, icon: dbpath })
    }
}
export default new CategoryService() as CategoryService