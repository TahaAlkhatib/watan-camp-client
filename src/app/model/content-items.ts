export type ContentItem = {
    type: 'video' | 'pdf' | 'html'
    name?: string
    arName?:string
    url?: string
    files?: any[]
    content?: string
    arContent?: string
}

export type ContentItems = {
    _id: string
    items: ContentItem[]
    section: string
    campId: string
}