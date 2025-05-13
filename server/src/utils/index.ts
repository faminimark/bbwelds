export const serializer = (data: unknown) => {
    const proccessed =  JSON.stringify(data, (key, value) =>
        typeof value === "bigint" ? Number(value) : value,
    );

    return JSON.parse(proccessed)
}