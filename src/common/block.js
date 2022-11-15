class TezosBlock {
	constructor(number, api) {
		this.number = number
		this.api = api
		this.data = null
	}

	async loadData() { 
		const { data } = await this.api.sendRequest(this.number)
		this.data = data
		return this
	}

	getBlockBaker() {
		return this.data?.metadata?.baker || null
	}

	getBakerFee() {
		const updates = this.data?.metadata?.balance_updates
		if (!updates) {
			return null
		}

		const block_update = updates.find(x => x.category === 'block fees')
		const fee = block_update?.change
		if (!fee) {
			return null
		}

		return Math.abs(Number(fee))
	}
}

export default TezosBlock