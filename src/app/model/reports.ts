export type ReportBlockItem = {
    enKey: string
    arKey: string
    enValue: string
    arValue: string
}

export type ReportBlock = {
    items: ReportBlockItem[]
}

export type ReportSector = {
    enName: string
    arName: string
    blocks: ReportBlock[]
}

export type ReportBody = {
    _id: string
    section: string
    campId: string
    sectors: ReportSector[]
}