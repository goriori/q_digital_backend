interface BodyParamValid {
    param_name: string;
    type: string;
}

export const validInputBody = (bodyParams: Array<BodyParamValid>, bodyValues: object) => {
    const validError: Array<string> = []
    bodyParams.forEach(param => {
        if (
            typeof bodyValues[param.param_name] !== param.type
            || bodyValues[param.param_name] === null
            || bodyValues[param.param_name] === undefined

            ) validError.push(`${param.param_name} failed verification`)
    })

    return validError
}