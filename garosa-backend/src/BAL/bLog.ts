import * as vf from '../Helpers/ValidateFields';
import { Log, ILog } from '../DAL/Log';
import { Response } from '../DAL/Response';

export async function CreateLog(request: ILog): Promise<Response> {
    try {
        const newLog = await Log.create({
            userId: request.userId,
            logName: request.logName,
            logDescription: request.logDescription,
            logSource: request.logSource,
            logStatus: request.logStatus,
            deleted: false,
        });
        return new Response(200, 'Log created successfully', newLog);
    } catch (error) {
        return new Response(500, 'Error while creating a new log', null);
    }
}

export async function GetAllLogs(request: { order: string; status: string }) {}
