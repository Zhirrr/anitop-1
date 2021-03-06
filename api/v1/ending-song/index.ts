import { NowRequest, NowResponse } from "@vercel/node"
import { join } from "path"
import { promises as fsPromises } from 'fs';
import { Data } from "../../../types/common"

const fileData = join(__dirname, '..', '..', '..', 'data/', 'ending-song.json')

export default async (request: NowRequest, response:NowResponse) => {
    const { limit }: any = request.query
    const readData = await fsPromises.readFile(fileData, 'utf-8')
    const endingSong = JSON.parse(readData)
    let result = endingSong.slice(0, limit)
    const data:Data = {
        code: response.statusCode,
        message: "List of ending song trending data",
        totalItems: limit === undefined 
            ? endingSong.length
            : result.length
            ? limit > endingSong.length
            ? null
            : result.length
            : endingSong.length,
        data: limit === undefined 
            ? endingSong
            : result
            ? limit > endingSong.length 
            ? null 
            : result 
            : endingSong,
    }
    response.status(response.statusCode).send(data)
}