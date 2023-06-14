export const langLoveArr = [
    { value: 'Крыса' },
    { value: 'Бык' },
    { value: 'Тигр' },
    { value: 'Кролик' },
    { value: 'Дракон' },
    { value: 'Змея' },
    { value: 'Лошадь' },
    { value: 'Коза' },
    { value: 'Обезьяна' },
    { value: 'Петух' },
    { value: 'Собака' },
    { value: 'Кабан' },
    { value: 'Не знаю' },
]

export const ZodiakArr = [
    { value: 'Овен' },
    { value: 'Телец' },
    { value: 'Близнецы' },
    { value: 'Рак' },
    { value: 'Лев' },
    { value: 'Дева' },
    { value: 'Весы' },
    { value: 'Скорпион' },
    { value: 'Стрелец' },
    { value: 'Козерог' },
    { value: 'Водолей' },
    { value: 'Рыбы' },
    { value: 'Не знаю' },
]

export const ZodiakArrValues = ZodiakArr.map(({value}) => value)
export const langLoveArrValues = ZodiakArr.map(({value}) => value)
export const YearsArr: string[] = []


for (let i = 1930; i < new Date().getFullYear(); i++) {
    YearsArr.push(String(i))
}
