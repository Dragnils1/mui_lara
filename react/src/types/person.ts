import { Filter } from "./filter";

export interface Person {
    about: string;
    birthday: string;
    birthdaychild1: string;
    birthdaychild2: string;
    birthdaychild3: string;
    birthdaychild4: string;
    birthyear: string;
    children: string;
    city: string;
    color: null | string;
    comment: string;
    comp: string;
    dateofend: string | Date;
    defer: string | number;
    email: string;
    familystatus: string;
    fav: string;
    fav_date: string;
    fav_modify: string;
    fb: string;
    firstname: string;
    gender: string;
    height: string;
    helptext: string;
    id: string ;
    images: string;
    inst: string;
    langlove: string;
    langlove2: string;
    lastlove: string;
    lastzodiak: string;
    ok: string;
    pass: string;
    phone: string;
    report: string;
    smoke: string;
    source: string;
    source_type: string;
    targetsearch: string;
    targetsearchtext: string;
    vip: string | number;
    vk: string;
    weight: string | number;
    year: string | number;
    zodiak: string;
    role: string;
    profile_actions: ProfileActions | undefined
}

export interface ProfileActions {
    color: string | null
    created_at: string
    defer: number
    dragableColor: string | null
    filters: Filter[]
    id: number
    next_contact_date: string | null
    profile_id: number
    status: string
    updated_at: string
    visible_pass: string | null
}

