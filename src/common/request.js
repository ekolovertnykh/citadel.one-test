import axios from 'axios'

class Api {

	#config = {
		timeout: 5000
	}

	setBaseUrl(url) {
		this.#config.baseURL = url
	}

	sendRequest(block) {
		if (!this.#config.baseURL) {
			throw new Error('Перед отправлением запроса нужно установить базовый URL')
		}
		this.#config.url = block.toString()
		return axios.request(this.#config)
	}
}


export default new Api()