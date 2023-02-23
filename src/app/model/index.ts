

export * from './content-items'
export * from './camp'

export const DepartmentManagerRole = 'dep-manager'
export const ManagementRole = 'manager'
export const AccountantRole = 'accountant'


export type Role = {
    _id: string
    name: string
}