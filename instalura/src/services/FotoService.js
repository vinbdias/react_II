import HttpService from './HttpService';
import UsuarioService from './UsuarioService';

export default class FotoService extends HttpService {  
    
    constructor() {

        super();
        this._usuarioService = new UsuarioService();

        this._privateApiUrl += `fotos`;
        this._publicApiUrl += `fotos`;
    }

    obterFotos(usuario) {
        
        let url = (usuario != '') ?
         `${this._publicApiUrl}/${usuario}` :
          `${this._privateApiUrl}?X-AUTH-TOKEN=${this._usuarioService.obterToken()}` ;

        return new Promise((resolve, reject) => {

            this.get(url)
                .then(fotos => resolve(fotos))
                .catch(erro => reject('Não foi possível obter fotos.'));
        });
    }

    curtirFoto(fotoId) {
        return new Promise((resolve, reject) => {

            this.post(`${this._privateApiUrl}/${fotoId}/like?X-AUTH-TOKEN=${this._usuarioService.obterToken()}`, {})
            .then(usuarioCurtiu => resolve(usuarioCurtiu))
            .catch(erro => reject('Não foi possível curtir a foto.'));
        });
    }

    comentarFoto(fotoId, comentario) {

        return new Promise((resolve, reject) => {

            this
            .post(`${this._privateApiUrl}/${fotoId}/comment?X-AUTH-TOKEN=${this._usuarioService.obterToken()}`, {

                texto: comentario
            })
            .then(novoComentario => resolve(novoComentario))
            .catch(erro => reject('Não foi possível comentar.'));
        });
    }

    pesquisarFotoss(termoPesquisa) {

        return new Promise((resolve, reject) => {

            this.get(`${this._publicApiUrl}/${termoPesquisa}`)
                .then(resultadoPesquisa => resolve(resultadoPesquisa))
                .catch(erro => reject('Não foi possível pesquisar.'));
        });
    }
}

