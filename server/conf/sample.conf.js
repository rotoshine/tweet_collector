module.exports = {
  'mongodb_url': 'id와 password를 포함한 mongodb url',
  'twitter': {
    'consumer_key': '트위터의 컨슈머 키',
    'consumer_secret': '트위터의 컨슈머 시크릿',
    'access_token_key': '트위터의 엑세스 토큰 키',
    'access_token_secret': '엑세스 토큰 시크릿'
  },
  // 트윗을 수집할 주기. 단위는 ms이고 이 값을 너무 짧게 줄 경우 계정이 리밋에 걸릴 수도 있으니 주의.
  'collecting_cycle': 10000,
  'search': {
    'q': '검색할 쿼리',
    'lang': '검색할 언어'
  }
};
