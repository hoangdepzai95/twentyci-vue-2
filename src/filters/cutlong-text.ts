export default function (value: string): string {
    const maxLength = 100;
    if (value.length > maxLength) {
        return `${value.slice(0, maxLength + 1)}...`;
    }

    return value;
}
