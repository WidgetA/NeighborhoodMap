const amapKey = "83852dc6b0af985b44b56dcb4fe71738"
const amapUrl = "https://restapi.amap.com/v3/traffic/status/circle?"

export const get = (lo, la) =>
  fetch(`${amapUrl}/key=${amapKey}&/location=${lo},${la}&radius=1500`, { headers })
    .then(res => res.json())
    .then(data => data.trafficinfo)