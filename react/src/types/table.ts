import { Data } from "./data";
import { QuizType } from "./quiz";

export type Order = 'asc' | 'desc';

export interface HeadCell {
    id: keyof Data;
    label: string;
}

export interface Tableprops {
    data: Data[]
    nameOfTable?: string,
    profile?: QuizType;
    headCellsProp?: HeadCell[]
}

export interface EnhancedTableToolbarProps {
    numSelected: number;
    nameOfTable?: string;
}

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    headCellsProp?: HeadCell[]
}

export const headCells: HeadCell[] = [
    {
        id: 'defer',
        label: 'Отл',
    },
    {
        id: 'defer',
        label: 'Выборка',
    },
    {
        id: 'firstname',
        label: 'Имя и фамилия',
    },
    {
        id: 'birthday',
        label: 'Дата рождения',
    },
    {
        id: 'birthyear',
        label: 'В год кого',
    },
    {
        id: 'zodiak',
        label: 'Знак зодиака',
    },
    {
        id: 'langlove',
        label: 'Осн. язык',
    },
    {
        id: 'langlove2',
        label: 'Втор. язык',
    },
    {
        id: 'vip',
        label: 'VIP',
    },
    {
        id: 'phone',
        label: 'Телефон',
    },
    {
        id: 'vk',
        label: 'VK',
    },
    {
        id: 'vk',
        label: 'VK ссылка',
    },
    {
        id: 'id',
        label: 'Ред.',
    },
    {
        id: 'id',
        label: 'Контрольная дата контакта',
    },
    {
        id: 'id',
        label: 'Сохранить',
    },
    {
        id: 'id',
        label: 'Админу',
    },

    {
        id: 'id',
        label: 'Экспорт',
    },
    {
        id: 'id',
        label: 'На обработку',
    },
    {
        id: 'id',
        label: 'Главному модератору',
    },
    {
        id: 'id',
        label: 'На модерацию',
    },
    {
        id: 'id',
        label: 'Архив',
    },
    {
        id: 'id',
        label: 'Модерация',
    },
    {
        id: 'id',
        label: 'Информация',
    },
    {
        id: 'id',
        label: 'В корзину',
    },
    {
        id: 'id',
        label: 'Удалить',
    },
    {
        id: 'last_modify',
        label: 'Регистрация',
    },
    {
        id: 'reg_date',
        label: 'Последнее изменение',
    },
    {
        id: 'source_type',
        label: 'Источник',
    },
    {
        id: 'source',
        label: 'Откуда узнали',
    },
];

export interface reorderProps {
    list: Data[],
    startIndex: number,
    endIndex: number
}