import HttpService from './HttpService';

export default class FotoService extends HttpService {   

    obterFotos() {

       return new Promise((resolve, reject) => {

            this.get(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
                .then(fotos => resolve(fotos))
                .catch(erro => reject('Não foi possível obter autores.'));
       });
    }
}

