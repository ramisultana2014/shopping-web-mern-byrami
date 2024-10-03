import { useEffect, useState } from "react";

async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
export function useAddress() {
  const [addressData, setAddressData] = useState({
    position: null,
    address: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // 1) We get the user's geolocation position
        const positionObj = await getPosition();
        const position = {
          latitude: positionObj.coords.latitude,
          longitude: positionObj.coords.longitude,
        };

        // 2) Then we use a reverse geocoding API to get a description of the user's address
        const addressObj = await getAddress(position);
        const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

        // 3) Then we update the state with the data
        setAddressData({ position, address });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
      }
    }

    fetchData(); // Call the async function defined above
  }, []); // Empty dependency array for running only once on mount

  return addressData;
}
