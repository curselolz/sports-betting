export default class Api {
    constructor() {
        throw new Error('Cannot construct singleton');
    }

    static setEndpoins(endpoints) {
        this._endpoints = endpoints;
    }

    static setHosts(hosts) {
        this._hosts = hosts;
    }

    static setToken(token) {
        this.token = token;
    }

    static removeToken() {
        delete this.token;
    }

    static get(urlData) {
        return this._request(urlData, 'GET');
    }

    static post(urlData, data) {
        return this._request(urlData, 'POST', data);
    }

    static put(urlData, data) {
        return this._request(urlData, 'PUT', data);
    }

    static delete(urlData) {
        return this._request(urlData, 'DELETE');
    }

    static postFile(path, fields) {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', path);
        if (this.token) {
            xhr.setRequestHeader('X-Parse-Session-Token', this.token);
        }

        const formData = new FormData();
        fields.forEach(((f) => {
            formData.append(f.name, f.data);
        }));

        return new Promise((res, rej) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    res(JSON.parse(xhr.responseText));
                } else if (!xhr.status > 299) {
                    rej(xhr);
                }
            };
            xhr.send(formData);
        });
    }

    static putFile(path, fields) {
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', path);
        if (this.token) {
            xhr.setRequestHeader('X-Parse-Session-Token', this.token);
        }

        const formData = new FormData();
        fields.forEach((f) => {
            formData.append(f.name, f.data);
        });

        return new Promise((res, rej) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    res(JSON.parse(xhr.responseText));
                } else if (!xhr.status > 299) {
                    rej(xhr);
                }
            };
            xhr.send(formData);
        });
    }

    static async redirect(urlData) {
        if (typeof this._endpoints?.redirect?.[urlData.url] !== 'function') {
            throw new Error(`Endpoint "${urlData.url}" not found. 
You likely forgot add endpoint in 'endpoints.js' or call setEndpoints method of api service.`);
        }

        // generate endpoint string
        let path = this._endpoints.redirect[urlData.url]({
            ...urlData,
            ...this._hosts,
        });

        // query string params serialization
        if (typeof urlData.params === 'object' && Object.keys(urlData.params).length) {
            path += `?${Object
                .keys(urlData.params)
                .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(urlData.params[k])}`)
                .join('&')}`;
        }

        if (typeof window !== 'undefined') {
            window.location.href = path;
        }
    }

    static async _request(urlData, method, data) {
        const [module, endpoint] = urlData.url.split('.');

        if (typeof this._endpoints?.[module]?.[endpoint] !== 'function') {
            throw new Error(`Endpoint "${urlData.url}" not found.
You likely forgot add endpoint in 'endpoints.js' or call setEndpoints method of api service.`);
        }


        // generate endpoint string
        let path = this._endpoints[module][endpoint]({
            ...urlData,
            ...this._hosts,
        });

        // query string params serialization
        if (typeof urlData.params === 'object' && Object.keys(urlData.params).length) {
            path += `?${Object
                .keys(urlData.params)
                .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(urlData.params[k])}`)
                .join('&')}`;
        }

        const options = {
            method: method || 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (this.token) {
            options.headers.Authentication = `Bearer: ${this.token}`;
            options.headers['X-Parse-Session-Token'] = this.token;
        }

        if (data) {
            options.body = JSON.stringify(data);
        }

        const res = await fetch(path, options);
        await this._filterError(res);

        const json = await res.json();
        return json;
    }

    static async _filterError(res) {
        if (res.status < 200 || res.status > 300) {
            const contentType = res.headers.get('Content-Type');

            // eslint-disable-next-line no-bitwise
            if (!contentType && (!contentType || !~contentType.indexOf('json'))) {
                throw new Error(res.statusText);
            }

            throw await res.json();
        }
    }
}
