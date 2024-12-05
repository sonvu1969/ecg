var nameBle;
var deviceUuid;
var notifyUuid;
var writeUuid;

var deviceEcg;
let appState;
let notifyEcg;
let serviceEcg;
let gattEcg;

window.callEcg = async function () {
  appState = window.appEcg;
  appEcg.getConnect(0);
  getDevicesEcg();
};

async function setUuid(obj) {
  nameBle=obj.nameBle;
  deviceUuid=obj.deviceUuid;
  notifyUuid=obj.notifyUuid;
  writeUuid=obj.writeUuid;
}

function handleNotify(event) {
  appEcg.getValue(event.target.value) ;
}

async function advertisemenEcg(event) {
  connectEcg(deviceEcg);
}

async function getDevicesEcg() {
  try {
    const devices = await navigator.bluetooth.getDevices();
    for (const device of devices) {
      if(device.name=nameBle){
        deviceEcg=device;
        deviceEvent=false;
        appEcg.getConnect(0);
      }else{ 
        deviceEvent=true;
        appEcg.getConnect(2);
      }
    }
    deviceEcg.addEventListener('gattserverdisconnected',disconnectedEcg);
    deviceEcg.addEventListener('advertisementreceived', advertisemenEcg);
    try {
      deviceEvent=false;
      appEcg.getConnect(0);
      await deviceEcg.watchAdvertisements();
    }
    catch(error) {
      appEcg.getConnect(2);
      deviceEvent=true;
    }
  }
  catch(error) {
    appEcg.getConnect(2);
    deviceEvent=true;
  }
}

async function connectDevice() {
  if(deviceEvent){
  deviceEcg = null;
  try {
    deviceEcg = await navigator.bluetooth.requestDevice({
      filters: [{name: nameBle}],
      optionalServices: [deviceUuid,notifyUuid,writeUuid],
      acceptAllDevices: false,
    });
    deviceEcg.addEventListener('gattserverdisconnected',disconnectedEcg);
    connectEcg(deviceEcg);
  } catch(error) {
    //time('Argh! ' + error);
  }
 }else getDevicesEcg();
}

async function connectEcg(device) {
  //appEcg.getConnect(0);
  autoEcg(
    async function toTry() {
      //time('Connecting to Bluetooth Device... ');
      await device.gatt.connect()
      .then(gattServer =>{
        gattEcg=gattServer;
        return gattEcg.getPrimaryService(deviceUuid);
      }).then(service => {
        serviceEcg= service;
        return serviceEcg.getCharacteristic(notifyUuid);
      }).then(characteristic => {
        notifyEcg= characteristic;
       return notifyEcg.startNotifications().then(_ => {
         notifyEcg.addEventListener('characteristicvaluechanged',
         handleNotify);
       });
     })
    },
    function success() {
      appEcg.getConnect(1);
      //time('> Bluetooth Device connected. Try disconnect it now.');
    },
    );

}
async function autoEcg(toTry, success) {
  try {
    const result = await toTry();
    success(result);
  } catch(error) {
    //time('Retrying in s... '+ max++);
    setTimeout(function() {autoEcg(toTry, success);},500);
  }
}

async function disconnectedEcg() {
  appEcg.getConnect(0);
  connectEcg(deviceEcg);
}

function svReload(){
 // window.stop();
 // window.location.reload();
  window.location.replace()
}



async function writeOnCharacteristic(value){
  if (gattEcg&& gattEcg.connected) {
     serviceEcg.getCharacteristic(writeUuid)
    .then(characteristic => {
        const data =new TextEncoder("utf-8").encode(value);
        return characteristic.writeValue(data);
    }).then(() => {
      //appEcg.getRssi(6);  
    }).catch(error => {
      //appEcg.getRssi(7);  
      });
  } else {
    //appEcg.getRssi(8);  
  }
}