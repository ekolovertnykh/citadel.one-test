class TezosBlock {
	constructor(number, api) {
		this.block_number = number
		this.api = api
		this.block_data = null
	}

	async loadData() { 
		const { data } = await this.api.sendRequest(this.block_number)
		this.block_data = data
		return this
	}

	getBlockBaker() {
		return this.block_data?.metadata?.baker || null
	}

	getBakerFee() {
		const updates = this.block_data?.metadata?.balance_updates
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