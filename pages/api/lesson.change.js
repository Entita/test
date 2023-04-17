import { dbConnect, UpdateOneFromMongo, findAllFromMongo, findOneFromMongo, deleteOneFromMongo } from '../../utils/dbMongo'
import { addLessonChange } from './student.change'
import Apology from '../../models/Apology'
import PaymentRequest from '../../models/PaymentRequest'
import { getUser } from './user'

dbConnect();

const updateInfoInApology = async (filter, data) => {
    return await UpdateOneFromMongo(Apology, filter, data)
}

const createPaymentRequest = (data) => {
    return PaymentRequest(data).save()
}

const createApology = (data) => {
    return Apology(data).save()
}

export default async function handler(req, res) {
    const { method, body, query } = req;

    switch (method) {
        case 'GET':
            try {
                res.status(200).json(true);
            } catch {
                res.status(500).json({ failed: true });
            }
            break;
        case 'POST':
            try {
                const { studentId, lessonId, date } = body

                await createApology({ studentId, lessonId, from: date.from })
                await addLessonChange({ _id: lessonId }, { $push: { statuses: date } })

                const userData = await getUser({ _id: studentId })
                res.status(200).json( userData );
            } catch {
                res.status(500).json({ failed: true });
            }
            break;
        case 'PUT':
            try {
                const { id, lessonId, from, amount } = body

                await createPaymentRequest({ studentId: id, lessonId, from, amount })

                const userData = await getUser({ _id: id })
                res.status(200).json( userData );
            } catch {
                res.status(500).json({ failed: true });
            }
            break;
        case 'DELETE':
            try {
                res.status(200).json(true);
            } catch {
                res.status(500).json({ failed: true });
            }
            break;
        case 'PATCH':
            try {
                const { adminId, apologyId } = body
                
                await updateInfoInApology({ _id: apologyId }, { seen: true })

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