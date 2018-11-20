export const Validators = {
    minLength(minLength: number): any {
        return (value: string): boolean => {
            return (value || '').length >= minLength;
        };
    },

    maxLength(value: string, maxLength: number): boolean {
        return (value || '').length <= maxLength;
    },

    required(value: string): boolean {
        return !!value;
    }

};
