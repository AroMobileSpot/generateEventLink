// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export function generateICalEvent(
  eventName,
  eventStartDate,
  eventEndDate,
  eventLocation,
  eventDescription
) {
  const start = eventStartDate.toISOString().replace(/-|:|\.\d+/g, "");
  const end = eventEndDate.toISOString().replace(/-|:|\.\d+/g, "");

  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "DTSTART:" + start,
    "DTEND:" + end,
    "SUMMARY:" + eventName,
    "LOCATION:" + eventLocation,
    "DESCRIPTION:" + eventDescription,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const uri = "data:text/calendar;charset=utf8," + encodeURIComponent(content);

  // Write data to the database

  // Write data to the database
  // const eventRef = await addDoc(eventsCollection, {
  //   title: "Anaya Dev Test",
  //   uri,
  // });

  return uri;
}

export function addEventToCalendar() {
  const eventName = "Sample Event";
  const eventStartDate = new Date("2023-03-17T09:00:00-07:00");
  const eventEndDate = new Date("2023-03-17T11:00:00-07:00");
  const eventLocation = "123 Main St, Anytown, USA";
  const eventDescription = "This is a sample event description.";

  const link = generateICalEvent(
    eventName,
    eventStartDate,
    eventEndDate,
    eventLocation,
    eventDescription
  );
}

export function generateWhatsAppLink() {
  const eventName = "Sample Event";
  const eventStartDate = new Date("2023-03-17T09:00:00-07:00");
  const eventEndDate = new Date("2023-03-17T11:00:00-07:00");
  const eventLocation = "123 Main St, Anytown, USA";
  const eventDescription = "This is a sample event description.";

  const idCal = generateICalEvent(
    eventName,
    eventStartDate,
    eventEndDate,
    eventLocation,
    eventDescription
  );
  // const querySnapshot = await getDocs(eventsCollection);
  // console.log("querySnapshot", querySnapshot);
  // querySnapshot.find((doc) => {
  //   console.log("docu event", doc);
  // });
  const whatsappLink =
    "https://aromobilespot.github.io/generateEventLink/?idCal=" +
    encodeURIComponent(idCal);
  return whatsappLink;
}
