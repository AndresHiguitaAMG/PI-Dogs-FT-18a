//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { default: axios } = require('axios');
const server = require('./src/app.js');
const { conn, Temperament } = require('./src/db.js');


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async() => {
  
  let dataTemps = []
  const infoApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  infoApi.data.forEach(el => {
    const stringTemp = el.temperament;
    if(stringTemp){
      const arryTemp = stringTemp.split(",").map(el => el.trim());
      arryTemp.forEach(el => !dataTemps.includes(el) && dataTemps.push(el));
    }
  });
  
  const promiseTemps = dataTemps.sort().map(el => Temperament.create({name: el}));
  await Promise.all(promiseTemps);
  // console.log(promiseTemps);
  
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
