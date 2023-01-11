import { data } from './dataFile.js';

const findIdealStartedDatePartners = (country, partners) => {
  let partnersByDate = {};
  let bestAvailableDate = null;
  let maxAttendees = 0;

  partners.forEach((partner) => {
    const { availableDates } = partner;
    let potentialDates = availableDates.filter(
      (date, index) =>
        // checking if two dates are consecutive days by:
        // Creating a new Date object for the current date
        // Using the getDate() method on that Date object to get the day of the month for the current date.
        // Adding 1 to check if the current date and the next date are consecutive
        // Creating another new Date object for the next date in the availableDates array, which is accessed using availableDates[index + 1].
        // Using the getDate() method on that Date object to get the day of the month for the next date.'
        new Date(date).setDate(new Date(date).getDate() + 1) ===
        new Date(availableDates[index + 1]).setDate(
          new Date(availableDates[index + 1]).getDate(),
        ),
    );
    console.log(potentialDates);

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
    const receiveResult = await fetch(data);
    const receiveData = await receiveResult.json();
    // console.log(receiveData);

    // Group by countries
    let groupedByCountries = new Map();
    // console.log(groupedByCountries);
    receiveData.partners.forEach((partner) => {
      const { country } = partner;
      if (!groupedByCountries.has(country)) {
        groupedByCountries.set(country, []);
      } else {
        groupedByCountries.get(country).push(partner);
      }
    });

    let countries = [];
    for (const [country, partners] of groupedByCountries) {
      countries.push(findIdealStartedDatePartners(country, partners));
    }
    return countries;
  } catch (error) {
    console.log(error);
  }
};

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
