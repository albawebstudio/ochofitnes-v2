export interface Price {
    amount: number,
    currency: string,
    unit: {
            measure: string,
        quantity: number,
    },
    formattedValue: string,
}
