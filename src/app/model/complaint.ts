export class Complaint {
    _id: string
    fullName: string
    email: string
    phone: string
    subject: string
    complaint: string
    status: 'onHold' | 'resolved'
}