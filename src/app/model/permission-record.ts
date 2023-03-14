export type PermissionRecord = {
    _id: string
    section: string
    action: 'read' | 'write'
    roles: string[]
}