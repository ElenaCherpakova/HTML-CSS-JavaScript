import { data } from './dataFile.js';


const findIdealStartedDatePartners = (country, partners) => {
  let partnersByDate = {};
  let bestAvailableDate = null;
  let maxAttendees = -1;

  partners.forEach((partner) => {
    const { availableDates } = partner;
    let potentialDates = availableDates.filter(
      (date, index) => {
            // checking if two dates are consecutive days by:
      // Creating a new Date object for the current date
      // Using the getDate() method on that Date object to get the day of the month for that date.
      // Adding 1 to that day using the setDate() method.
      // Creating another new Date object f the next date in the availableDates array, which is accessed using availableDates[index + 1].
      // Using the getDate() method on that Date object to get the day of the month for the next date.'
        let currentDate = new Date(date).setDate(new Date(date).getDate() + 1);
        let nextDate = new Date(availableDates[index + 1]).setDate(new Date(availableDates[index + 1]).getDate());
        return currentDate === nextDate;
      },
    );
    // console.log(potentialDates);

    potentialDates.forEach((date) => {
      // creating a key with the date and assigning it to an empty array if it doesn't exist yet: {'2019-01-01': []}
      partnersByDate[date] = partnersByDate[date] || [];
      // console.log("OBj", partnersByDate)
      // if the key already exists, push the partner to the array
      partnersByDate[date].push(partners);

      if (partnersByDate[date].length > maxAttendees) {
        bestAvailableDate = date;
        maxAttendees = partnersByDate[date].length;
      }
    });
  });
  return {
    partnerCount: maxAttendees,
    partners: partnersByDate[bestAvailableDate].map((partner) => partner.email),
    name: country,
    startDate: bestAvailableDate,
  };
};

// make a GET request to the API

const fetchData = async () => {
  try {
    const receiveData = data; // in real example we need to fetch with async await func since it returns promise to get real data we need to call json() and await that promise
    // console.log({ receiveData })
    // console.log(receiveData);
    // Group by countries using Map
    let groupedByCountries = new Map();
    receiveData.partners.forEach((partner) => {
      const { country } = partner;
      if (!groupedByCountries.has(country)) {
        groupedByCountries.set(country, []);
      } else {
        groupedByCountries.get(country).push(partner);
      }
    });
    // console.log(groupedByCountries);

    let countries = [];
    for (const [country, partners] of groupedByCountries) {
      countries.push(findIdealStartedDatePartners(country, partners));
    }
    return countries;
  } catch (error) {
    console.log(error);
  }
};
// console.log(fetchData());

// send a POST request to the API
const sendData = async (countries) => {
  try {
    const sendData = await fetch(data, {
      method: 'POST',
      body: JSON.stringify(countries),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await sendData.json();
    console.dir(result);
  } catch (error) {
    console.log(error);
  }
};

// call the functions
const mainFn = async () => {
  const countries = await fetchData();
  await sendData(countries);
};

mainFn();
