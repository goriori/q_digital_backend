import { hash, genSalt, compare } from 'bcrypt'



const saltRounds: number = 10
export const generateHashString = (data: string, writingDb: (hash: string) => {}): void => {
    genSalt(saltRounds, 'a', async (err: Error, salt: string) => {
        const genHash = await hash(data, salt)
        return writingDb(genHash)
    })
}

export const checkHashString = async (string: string, hash: string): Promise<boolean> => {
    console.log('checkHash data: ', string, hash)
    const result = await compare(string, hash)
    return result
} 