export default () => {
	const memoryUsed = process.memoryUsage().heapUsed / 2 ** 10 / 2 ** 10
	return memoryUsed.toFixed(2)
}