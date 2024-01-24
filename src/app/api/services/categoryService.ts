import { existsSync, mkdirSync, unlink, writeFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { createCategory, deleteCategory } from '../repositories/categoriesRepository';

const FILES_FOLDER = "public"
const DB_FOLDER = "uploads"

const VALID_IMAGE_EXTENSIONS = ['png', 'jpg', 'gif']
const MAX_FILE_SIZE = 1000000

class CategoryService {

    async saveFile(file: File): Promise<string> {
        const fileExtension = file.name.split('.')[file.name.split('.').length - 1]
        if (file.size > MAX_FILE_SIZE)
            throw new Error(`File exeeds the size limit of ${MAX_FILE_SIZE / 1000000}mb`)

        if (!VALID_IMAGE_EXTENSIONS.includes(fileExtension))
            throw new Error('Invalid file extension')

        const fileContent = await file.arrayBuffer()
        const dbpath = `/${DB_FOLDER}/${uuidv4()}.${fileExtension}`
        const path = `${FILES_FOLDER}/${dbpath}`

        if (!existsSync('public/uploads/')) {
            mkdirSync('public/uploads/')
        }
        writeFile(path, Buffer.from(fileContent), (err) => {
            if (err) throw (err)
        })
        return dbpath
    }

    async createCategory(title: string, file: File) {
        const dbpath = await this.saveFile(file)
        return createCategory({ title, icon: dbpath })
    }
    async deleteCategory(id: number) {
        const category = await deleteCategory(id)
        const path = `${FILES_FOLDER}${category.icon}`
        unlink(path, (error: any)=>{
            if (error){
                console.error(path + ' file not removed.')
            }
        })
    }
}
export default new CategoryService()