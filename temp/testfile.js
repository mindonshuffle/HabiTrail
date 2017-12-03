const moment = require("moment");
for( var i = 0; i < 10; i++){
    date = moment.utc().startOf('day').add(i, 'days').toDate();
    console.log(date);
}