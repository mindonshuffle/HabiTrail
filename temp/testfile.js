const moment = require("moment");
// for( var i = 0; i < 10; i++){
//     date = moment.startOf('day').add(i, 'days').toDate();
//     console.log(date);
// }
let date = moment().startOf('day').toDate();
console.log(date);