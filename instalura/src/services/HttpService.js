export default class HttpService {

    _handleErrors(res) {

        if(!res.ok) 
            throw new Error(res.statusText);
        else if([403, 404, 500].includes(res.status))
            throw new Error(res.error);

        return res;
    }

    get(url) {

        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    post(url, dados) {

        return fetch(url, {

            headers: new Headers({ 'Content-type': 'application/json' }),
            method: 'post',
            body: JSON.stringify(dados)
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json())
        .catch(erro => { throw new Error(erro.message) });
    }
}
