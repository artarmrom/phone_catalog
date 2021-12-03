export function modify(text, variable)
{
    return {
        type: "MODIFY",
        payload: {
            text,
            variable
        }

    }
}

export function deleteAll(text)
{
    return {
        type: "DELETE",
        payload: {
            text
        }

    }
}