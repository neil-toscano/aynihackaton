import { Request } from 'express';

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: any,
) => {
  if (!file) {
    return cb(new Error('file is empty'), false);
  }
  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  if (validExtensions.includes(fileExtension)) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};
