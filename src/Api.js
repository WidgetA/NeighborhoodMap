const amapKey = "83852dc6b0af985b44b56dcb4fe71738"
const amapUrl_traffic = "https://restapi.amap.com/v3/traffic/status/circle?"
const amapUrl_info = "restapi.amap.com/v3/geocode/regeo?"

export const getTraffic = (lo, la) =>
  fetch(`${amapUrl_traffic}/key=${amapKey}&/location=${lo},${la}&radius=1500`, { headers })
    .then(res => res.json())
    .then(data => data.trafficinfo)

//restapi.amap.com/v3/geocode/regeo?key=您的key&location=116.481488,39.990464&poitype=&radius=1000&extensions=all&batch=false&roadlevel=0
export const getInfo = (lo, la) =>
  fetch(`${amapUrl_info}/key=${amapKey}&/location=${lo},${la}&poitype=&radius=1000&extensions=all&batch=false&roadlevel=0`)
    .then(res => res.json())
    .then(data => data.regeocode)