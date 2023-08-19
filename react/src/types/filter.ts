export type Filter = {
    id: string
    filter_name: string 
    filter_type: string 
    default_value: string 
    created_at: string
    updated_at: string
}

export interface FilterColumns extends Filter {
    readonly: boolean | null
    createdByUser: boolean | null
}