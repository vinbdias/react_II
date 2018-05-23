import HttpService from "./HttpService";

export default class UsuarioService extends HttpService {

    autenticar(dadosAutenticacaoUsuario) {
        return fetch('http://localhost:8080/api/public/login', {
    
            headers: new Headers({ 'Content-type': 'application/json' }),
            method: 'post',
            body: JSON.stringify(dadosAutenticacaoUsuario)
        })
        .then(res => this._handleErrors(res))
        .then(res => res.text())
        .catch(erro => { throw new Error('Não foi possível autenticar o usuário.'); });      
    }
}