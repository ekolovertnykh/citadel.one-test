import TezosBlock from './common/block.js'
import api from './common/request.js'
import time from './common/time.js'
import memory from './common/heap.js'

async function main() {
	api.setBaseUrl('https://jakartanet.smartpy.io/chains/main/blocks/')

	const promises = []
	for (let blockNumber = 832543; blockNumber <= 832546; blockNumber++) {
		const blockInstance = new TezosBlock(blockNumber, api)
		const promise = blockInstance.loadData()
		promises.push(promise)
	}
	const results = await Promise.all(promises)
	
	const fees = {}
	while (results.length > 0) {
		const block = results.pop()
		const baker = block.getBlockBaker()
		if (!baker) {
			continue
		}
		if (fees[baker]) {
			fees[baker] += block.getBakerFee()
		}
		else {
			fees[baker] = block.getBakerFee()
		}
	}

	console.log('Bakers fees', fees)
	console.log('Memory (heapUsed, MB)', memory())
	console.log('Time (seconds)', time())
}


main()