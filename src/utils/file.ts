import { existsSync, readFile, readFileSync } from "fs"
/**
 * 获取File对象，与<input type="file" />相同
 */
export async function getFile(path: string) {
    if (existsSync(path)) {
        const data = await readFileSync(path);
        return new File([data], path)
    }
    return null
}