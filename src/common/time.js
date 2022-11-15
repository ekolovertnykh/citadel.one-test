const start = new Date().getTime()

export default () => {
	return (new Date().getTime() - start) / 1000
}