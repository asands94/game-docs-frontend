let apiUrl
const apiUrls = {
	production: process.env.REACT_APP_PROD_URL,
	development: 'http://localhost:8000',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}


export default apiUrl
