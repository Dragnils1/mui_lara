import { Control } from "react-hook-form";

export interface Filter extends CreateFilterType {
    id: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface FilterColumns extends Filter {
    readonly: boolean | null;
    createdByUser: boolean | null;
}

export type CreateFilterType = {
    filter_name: string;
    filter_type: string;
    default_value: string;
};

export interface FilterFormType extends CreateFilterType {
    name: `${string}` | `${number}`;
    control: Control<any>;
    label: string;
    default_data: string | string[];
    rest: any
}

export interface FilterFunctionType {
    (
        filter_name: string,
        filter_type: string,
        default_value: string,
        name: `${string}` | `${number}`,
        control: Control<any>,
        label: string,
        default_data: string | string[],
        ...propeties: any[]
    ): JSX.Element;
}
