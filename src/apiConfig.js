let apiUrl
const apiUrls = {
	production: process.env.REACT_APP_PROD_URL,
	development: 'http://localhost:8080',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

console.log(apiUrl)

export default apiUrl
