export type Gender = "Male" | "Female"
export type Status = "Active" | "Inactive"
export type Subject = {
    id: number,
    name: string,
    age: number,
    gender: Gender,
    diagnosis_date: string,
    status: Status,
}
