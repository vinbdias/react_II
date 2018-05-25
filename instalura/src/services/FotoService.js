import HttpService from './HttpService';

export default class FotoService extends HttpService {   

    obterFotos(usuario) {
        
        let url = (usuario != '') ?
         `http://localhost:8080/api/public/fotos/${usuario}` :
          `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}` ;

        return new Promise((resolve, reject) => {

            this.get(url)
                .then(fotos => resolve(fotos))
                .catch(erro => reject('Não foi possível obter autores.'));
        });
    }
}

