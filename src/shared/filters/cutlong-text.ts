export default function(value: string): string {
    const validValue = value || '';

    const maxLength = 100;
    if (validValue.length > maxLength) {
        return `${validValue.slice(0, maxLength + 1)}...`;
    }

    return validValue;
}
