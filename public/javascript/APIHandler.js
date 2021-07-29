//'http://localhost:8000'


class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList () {
    return axios.get(this.BASE_URL+'/characters');
  }

  getOneRegister (characterID) {
    return axios.get(this.BASE_URL+`/characters/${characterID}`);
  }

  createOneRegister (character) {
    return axios.post(this.BASE_URL+'/characters',character);
  }

  updateOneRegister (characterID,characterData) {
    return axios.patch(this.BASE_URL+`/characters/${characterID}`,characterData);
  }

  deleteOneRegister (characterID) {
    return axios.delete(this.BASE_URL+`/characters/${characterID}`);
  }
}
