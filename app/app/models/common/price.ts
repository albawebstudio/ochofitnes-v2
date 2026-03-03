export interface Price {
    amount: number,
    currency: string,
    unit: {
        preposition: string,
        measure: string,
        quantity: number,
    },
    formattedValue: string,
}
