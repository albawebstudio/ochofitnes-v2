export interface ScheduleField {
    label: string
    placeholder: string | null
}

export interface ScheduleLabels {
    title: string
    close: string
    name: ScheduleField
    email: ScheduleField
    phone: ScheduleField
    session_type: ScheduleField
    day_option: ScheduleField
    time_option: ScheduleField
    conditions: ScheduleField
    accept_terms: string
    cancel: string
    submit: string
}
