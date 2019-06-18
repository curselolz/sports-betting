export function createAction(name, payloadMapper) {
    const scopedName = this?.scope ? `${this.scope}/` : '';
    const type = `@@app/${scopedName}${name}`;

    function actionCreator(...args) {
        const { meta, payload, restFields } = payloadMapper
            ? payloadMapper(...args)
            : { payload: args[0], meta: args[1], restFields: args[2] };
        const metaFields = meta && { meta };

        return {
            type,
            payload,
            ...metaFields,
            ...restFields,
        };
    }

    actionCreator.toString = () => `${type}`;
    actionCreator.bind({ displayName: type });

    return actionCreator;
}

export const scopedCreator = scopeName => createAction.bind({ scope: scopeName });
