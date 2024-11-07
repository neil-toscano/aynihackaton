import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
export const fileNamer = (req: Request, file: Express.Multer.File, cb: any) => {
  if (!file) {
    return cb(new Error('file is empty'), false);
  }
  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuidv4()}.${fileExtension}`;
  cb(null, fileName);
};
