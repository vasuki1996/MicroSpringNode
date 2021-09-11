const fs = require('fs');
const yaml = require('js-yaml');

let obj = yaml.safeLoad(fs.readFileSync("application.yml", "utf-8"));

let write = `const t = \`${obj.server["key-store"]["cert"]}\``;

fs.writeFileSync("wr.js", write);

const regex = /enc(.+)/gm;
const str = `enc(asukduewbcrenqeybqieuy378673ve1xv3etqnoq8e9127)`;
let m;
let enc = regex.exec(str)[1];
console.log(enc.substr(1, enc.length - 2));
while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
    });
}

const test = "\r\nHotel Information: Check-in Time: 1:00 PM\r\nHotel Information: Check-out Time: 12:00 PM\r\nHotel Information: Category: Hotel\r\nHotel Facilities: Library\r\nHotel Facilities: Express check-in\r\nHotel Facilities: Elevator\r\nHotel Facilities: Rooftop terrace\r\nHotel Facilities: Front desk (limited hours)\r\nHotel Facilities: Porter/bellhop\r\nHotel Facilities: Restaurant\r\nHotel Facilities: Express check-out\r\nHotel Facilities: Tours/ticket assistance\r\nHotel Facilities: Free self parking\r\nHotel Facilities: Free WiFi\r\nHotel Facilities: Smoke-free property\r\nHotel Facilities: Computer station\r\nHotel Facilities: Safe-deposit box at front desk\r\nHotel Facilities: Luggage storage\r\nHotel Facilities: Free RV, bus, truck parking\r\nHotel Facilities: Free parking nearby\r\nHotel Facilities: Breakfast available (surcharge)\r\nHotel Facilities: Concierge services\r\nHotel Facilities: Shared refrigerator\r\nHotel Facilities: Parking (limited spaces)\r\nHotel Facilities: Television in common areas\r\nHotel Facilities: Accessible bathroom\r\nHotel Facilities: Roll-in shower\r\nHotel Facilities: Wedding services\r\nHotel Facilities: In-room accessibility\r\nHotel Facilities: Airport transportation (surcharge)\r\nHotel Facilities: Garden\r\nHotel Facilities: Multilingual staff\r\nHotel Facilities: Free newspapers in lobby\r\nHotel Facilities: No cribs (infant beds) available\r\nHotel Facilities: Pets not allowed\r\nHotel Facilities: Total number of rooms - 34\r\n";
console.log(test);