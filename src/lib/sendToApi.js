export function sendToApi(route, data) {
  // console.log('send to api', route, data);
  route = '/' + route;
  const request = fetch(route, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then( response => Promise.all([response, response.json()]));
  return request;
}

export function sendToApiNoHeaders(route, data) {
  // console.log('send to api, no headers', route, data);
  route = '/' + route;
  const request = fetch(route, {
    method: 'POST',
    body: data
  }).then( response => Promise.all([response, response.json()]));
  return request;
}

