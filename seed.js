import Places from './models/places';

let place1 = new Places({
    company: 'Super Laundry',
    longitude: 103.833461,
    latitude: 1.307192,
    address: '3 Marine Parade Road, S748562',
    openingHours: '12:00 - 21:30'
});
place1.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place2 = new Places({
    company: 'A B Clean',
    longitude: 103.832130,
    latitude: 1.306163,
    address: 'Alphabet Complex #12-54, S384756',
    openingHours: '11:00 - 21:00'
});
place2.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place3 = new Places({
    company: 'Clean Laundry',
    longitude: 103.831347,
    latitude: 1.305937,
    address: '54 Latenight Road, S983642 ',
    openingHours: '12:30 - 23:00'
});
place3.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place4 = new Places({
    company: 'Cotton Care',
    longitude: 103.833461,
    latitude: 1.304854,
    address: 'Midnight Building #14-76, S827495',
    openingHours: '12:30 - 21:30'
});
place4.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place5 = new Places({
    company: 'Blue Lagoon',
    longitude: 103.830382,
    latitude: 1.304736,
    address: 'Cake Top Tier Building #65-273, S385629',
    openingHours: '10:00 - 21:30'
});
place5.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place6 = new Places({
    company: 'Laundry Cares',
    longitude: 103.831809,
    latitude: 1.303856,
    address: 'Durian Building #74-123, S238574',
    openingHours: '11:30 - 21:00'
});
place6.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place7 = new Places({
    company: 'White Wash',
    longitude: 103.832796,
    latitude: 1.307978,
    address: '43 Papaya Lab #12-264, S328244',
    openingHours: '11:00 - 22:00'
});
place7.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place8 = new Places({
    company: 'Mrs Laundry',
    longitude: 103.834126,
    latitude: 1.308640,
    address: 'Blue Building #04-54, S498374',
    openingHours: '08:00 - 20:00'
});
place8.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place9 = new Places({
    company: 'Piing',
    longitude: 103.831476,
    latitude: 1.309262,
    address: 'Big Building Basement #B2-234, S458274',
    openingHours: '10:00 - 20:00'
});
place9.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});
