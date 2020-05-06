import WifiManager from "react-native-wifi-reborn";

async function isWifiEnabled() {
  return new Promise((res, rej) => {
    WifiManager.isEnabled((isEnabled) => {
      res(isEnabled);
    });
  })
}

async function validateWifiEnabled() {
  const isEnabled = await isWifiEnabled();

  if (!isEnabled) {
    WifiManager.setEnabled(true);
  }
}

async function fetchWifiList() {
  await validateWifiEnabled();

  return new Promise((res, rej) => {
    WifiManager.reScanAndLoadWifiList(
      wifiList => {
          let wifiArray =  JSON.parse(wifiList);
          res(wifiArray);
      },
      // TODO: handle error somehow
      error =>  rej(error)
    );
  })
}

function getWifiDataForSample(wifiList) {
  const wifiDict = wifiList.reduce((accum, curr) => {
    // Set object at key bssid with value rssi
    accum[curr.BSSID] = curr.level;
    return accum;
  }, {});

  return { rssi_by_bssid: wifiDict };
}

export const wifiService = {
  fetchWifiList,
  getWifiDataForSample
}
