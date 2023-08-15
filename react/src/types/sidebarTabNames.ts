export interface SidebarTabNames {
    name: string;
    href: 'moderation' | 'table' | 'lines' | 'profile-add' | 'import' | '#' ;
    dist?: string;
}

export let SidebarTabNamesArr: SidebarTabNames[] = [
    { name: 'Модерация', href: 'moderation', dist: 'moderation' },
    { name: 'Линия 1', href: 'table', dist: 'moderation' },
    { name: 'Линия 2', href: 'lines', dist: 'lines' },
    { name: 'На обработке', href: 'table', dist: 'cons' },
    { name: 'Добавить клиента', href: 'profile-add' },
    { name: 'Активный поиск', href: 'table', dist: 'profiles' },
    { name: 'Пассивный поиск', href: 'table', dist: 'profiles' },
    { name: 'Общая база', href: 'table', dist: 'profiles' },
    { name: 'Избранные', href: 'table', dist: 'get_fav_orders' },
    { name: 'Текстовая конс.', href: '#' },
    { name: 'Архив', href: 'table', dist: 'archive' },
    { name: 'Корзина', href: 'table', dist: 'trash' },
    { name: 'Клиенты из Excel', href: '#' },
    { name: 'Импорт', href: 'import' },
]