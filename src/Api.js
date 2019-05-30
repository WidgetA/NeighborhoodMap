const amapKey = "83852dc6b0af985b44b56dcb4fe71738"
const amapUrl_traffic = "https://restapi.amap.com/v3/traffic/status/circle?"
const amapUrl_info = "https://restapi.amap.com/v3/geocode/regeo?"

export const getTraffic = (lo, la) =>
  fetch(`${amapUrl_traffic}key=${amapKey}&location=${lo},${la}&radius=1500`)
    .then(res => res.json())
    .then(data => data.trafficinfo.description)

export const getInfo = (lo, la) =>
  fetch(`${amapUrl_info}key=${amapKey}&location=${lo},${la}&poitype=&radius=1000&extensions=all&batch=false&roadlevel=0`)
    .then(res => res.json())
    .then(data => data.regeocode.aois[0].name)
