import Places from './models/places';

let place1 = new Places({
    company: 'Super Laundry',
    longitude: 103.833461,
    latitude: 1.307192,
    address: 'Marine Parade',
    openingHours: '12:00 - 21:00'
});
place1.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place2 = new Places({
    company: 'Super Laundry',
    longitude: 103.832130,
    latitude: 1.306163,
    address: 'Marine Parade',
    openingHours: '12:00 - 21:00'
});
place2.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place3 = new Places({
    company: 'Super Laundry',
    longitude: 103.831347,
    latitude: 1.305937,
    address: 'Marine Parade',
    openingHours: '12:00 - 21:00'
});
place3.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place4 = new Places({
    company: 'Super Laundry',
    longitude: 103.833461,
    latitude: 1.304854,
    address: 'Marine Parade',
    openingHours: '12:00 - 21:00'
});
place4.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place5 = new Places({
    company: 'Super Laundry',
    longitude: 103.830382,
    latitude: 1.304736,
    address: 'Marine Parade',
    openingHours: '12:00 - 21:00'
});
place5.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place6 = new Places({
    company: 'Super Laundry',
    longitude: 103.831809,
    latitude: 1.303856,
    address: 'Marine Parade',
    openingHours: '12:00 - 21:00'
});
place6.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place7 = new Places({
    company: 'Super Laundry',
    longitude: 103.832796,
    latitude: 1.307978,
    address: 'Marine Parade',
    openingHours: '12:00 - 21:00'
});
place7.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place8 = new Places({
    company: 'Super Laundry',
    longitude: 103.834126,
    latitude: 1.308640,
    address: 'Marine Parade',
    openingHours: '12:00 - 21:00'
});
place8.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});

let place9 = new Places({
    company: 'Super Laundry',
    longitude: 103.831476,
    latitude: 1.309262,
    address: 'Marine Parade',
    openingHours: '12:00 - 21:00'
});
place9.save((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('1 place created');
});
