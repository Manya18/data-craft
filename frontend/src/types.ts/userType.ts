export type User = {
    id: number,
    surname: string,
    name: string,
    patronymic: string,
    email: string,
    phone: string,
    photo?: string
}

export type ProjectUser = {
    user: User,
    is_admin: boolean,
    role: string,
    invite_status: string
}

export type UserSettings = {
    user: User,
    light_theme: boolean,
    color_sceme: string,
    is_rus: boolean,
    mondey_start: boolean,
    time_format_24: boolean,
    date_format: string
}