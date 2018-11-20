export const Validators = {
    minLength(minLength: number): any {
        return (value: string): boolean => {
            return (value || '').length >= minLength;
        };
    },

    maxLength(maxLength: number): any {
        return (value: string): boolean => {
            return (value || '').length <= maxLength;
        };
    },

    required(value: string): boolean {
        return !!value;
    }

};
