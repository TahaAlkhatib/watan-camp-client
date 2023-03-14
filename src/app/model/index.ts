
import { User } from '@upupa/auth'



export * from './content-items'
export * from './camp'
export * from './department'
export * from './setting'
export * from './complaint'
export * from './permission-record'

export const DepartmentManagerRole = 'dep-manager'
export const ManagementRole = 'manager'
export const AccountantRole = 'accountant'


export type Role = {
    _id: string
    name: string
}

export type CampUser = User & {
    departmentId: string
    serialNumber: string
    campId: string
    password:string
    confirmPassword:string
}