export type PermissionRecord = {
    _id: string
    section: string
    action: 'read' | 'write'
    roles: string[]
    app: 'client' | 'admin'
}

export type AppPage = {
    section: string
    text: string
    record?: PermissionRecord
    children?: AppPage[]
}