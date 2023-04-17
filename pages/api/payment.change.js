import { dbConnect, UpdateOneFromMongo, findAllFromMongo, findOneFromMongo, deleteOneFromMongo } from '../../utils/dbMongo'
import Payment from '../../models/Payment'
import PaymentRequest from '../../models/PaymentRequest'
import { getUser } from './user'

dbConnect();

const removePaymentRequest = (filter) => {
    return deleteOneFromMongo(PaymentRequest, filter)
}

const createPayment = (data) => {
    return Payment(data).save()
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
                const { adminId, payment } = body

                await createPayment({
                    studentId: payment.userId,
                    lessonId: payment.lessonId,
                    from: payment.from,
                    amount: payment.amount,
                })
                await removePaymentRequest({ _id: payment.id })
                
                const userData = await getUser({ _id: adminId })
                res.status(200).json( userData );
            } catch {
                res.status(500).json({ failed: true });
            }
            break;
        case 'PUT':
            try {
                res.status(200).json(true);
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
                res.status(200).json(true);
            } catch {
                res.status(500).json({ failed: true });
            }
            break;
        default:
            break;
    }
}