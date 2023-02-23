export type ContentItem = {
    type: 'video' | 'pdf' | 'html'
    name?: string
    url?: string
    files?: any[]
    content?: string
}

export type ContentItems = {
    _id: string
    items: ContentItem[]
    section: string
    campId: string
}