import formidable from 'formidable'
import path from 'path'
import { updateInfoInUser } from './user.change'
import { getUser } from './user'
import { dbConnect, UpdateOneFromMongo, findAllFromMongo, findOneFromMongo, deleteOneFromMongo } from '../../utils/dbMongo'

dbConnect();

const readFile = req => {
  const options = formidable.defaultOptions
  options.uploadDir = path.join(process.cwd(), '/public/images')
  options.filename = (name, ext, path, form) => {
    return Date.now().toString() + '_' + path.originalFilename
  }
  const form = formidable()
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      try {
        res.status(200).json( true );
      } catch {
        res.status(500).json({ failed: true });
      }
      break;
    case 'PATCH':
      try {
        res.status(200).json( true );
      } catch {
        res.status(500).json({ failed: true });
      }
      break;
    case 'DELETE':
      try {
        res.status(200).json( true );
      } catch {
        res.status(500).json({ failed: true });
      }
      break;
    case 'PUT':
      try {
        res.status(200).json( true );
      } catch {
        res.status(500).json({ failed: true });
      }
      break;
    case 'POST':
      try {
        const { id, adminId } = query
        const files = await readFile(req)
        const fileName = files.files.file.newFilename

        await updateInfoInUser({ _id: id }, { $push: { files: fileName }})

        const userData = await getUser({ _id: adminId })
        res.status(200).json( userData );
      } catch {
        res.status(500).json({ failed: true });
      }
      break;
    default:
      break;
  }
}
