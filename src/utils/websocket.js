import Pusher from 'pusher-js';
import events from '../services/events';

export default class WebSocket {
    static _pusher = null;

    static _config = {};

    constructor() {
        throw new Error('Cannot construct singleton');
    }

    static getConnection() {
        if (this._pusher === null) {
            this._pusher = new Pusher(this._config.pusherKey, { cluster: this._config.cluster });
        }

        return this;
    }

    static setConfig({ envName, pusherKey, cluster }) {
        this._config = {
            envName,
            pusherKey,
            cluster,
        };
    }

    static connect() {
        this._pusher = new Pusher(this._config.pusherKey, { cluster: this._config.cluster });
    }

    static disconnect() {
        this._pusher.disconnect();
    }

    static subscribe(channel) {
        this._pusher.subscribe(channel);
    }

    static unsubscribe(channel) {
        this._pusher.unsubscribe(channel);
    }

    static on({ event, props }, callback) {
        const eventInfo = events[event];
        const channel = eventInfo?.channel({ ...this._config, ...props });
        const { eventName } = eventInfo;

        if (!this._pusher.channel(channel)) {
            this._pusher.subscribe(channel);
        }
        this._pusher.channel(channel).bind(eventName, callback);
    }
}
