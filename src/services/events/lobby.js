import { example } from '../../actions/exampleActions';

export default {
    example: {
        channel: ({ envName }) => (
            `${envName ? `${envName}-` : ''}example-events`
        ),
        eventName: 'example',
        action: example,
    },
};
