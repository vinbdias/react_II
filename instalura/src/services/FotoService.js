import HttpService from './HttpService';
import UsuarioService from './UsuarioService';

export default class FotoService extends HttpService {  
    
    constructor() {

        super();
        this._usuarioService = new UsuarioService();
    }

    obterFotos(usuario) {
        
        let url = (usuario != '') ?
         `http://localhost:8080/api/public/fotos/${usuario}` :
          `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${this._usuarioService.obterToken()}` ;

        return new Promise((resolve, reject) => {

            this.get(url)
                .then(fotos => resolve(fotos))
                .catch(erro => reject('Não foi possível obter fotos.'));
        });
    }

    curtirFoto(fotoId) {
        return new Promise((resolve, reject) => {

            this.post(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${this._usuarioService.obterToken()}`, {})
            .then(usuarioCurtiu => resolve(usuarioCurtiu))
            .catch(erro => reject('Não foi possível curtir a foto.'));
        });
    }
}

