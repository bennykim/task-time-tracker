export const getSunriseSunset = async (
  date: string,
  latitude: number,
  longitude: number
) => {
  const url = import.meta.env.VITE_APP_DATAGOKR_URL;
  const apiKey = import.meta.env.VITE_APP_DATAGOKR_API_KEY;

  try {
    const response = await fetch(
      `${url}?serviceKey=${apiKey}&locdate=${date}&longitude=${longitude}&latitude=${latitude}&dnYn=Y`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");

    const sunriseElement = xmlDoc.querySelector("sunrise");
    const sunsetElement = xmlDoc.querySelector("sunset");

    if (!sunriseElement || !sunsetElement) {
      throw new Error("Missing sunrise or sunset information in the XML data.");
    }

    if (!sunriseElement.textContent || !sunsetElement.textContent) {
      throw new Error("null or empty sunrise or sunset in the XML data.");
    }

    const sunrise = sunriseElement.textContent;
    const sunset = sunsetElement.textContent;

    return { sunrise, sunset };
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
