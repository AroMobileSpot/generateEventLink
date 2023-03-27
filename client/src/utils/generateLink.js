import config from "../../../server/config";
import { nanoid } from "nanoid";
import moment from "moment";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export async function generateICalEvent(
  eventName,
  eventStartDate,
  eventEndDate,
  eventLocation,
  eventDescription
) {
  const start = eventStartDate.replace(/-|:|\.\d+/g, "");
  const end = eventEndDate.replace(/-|:|\.\d+/g, "");

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
  ].join("\n");

  const uri = content;
  const id = nanoid();
  const data = {
    idCal: id,
    dataLink: uri,
  };
  const result = await fetch("/addEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("result", await result.json());
  // Write data to the database

  // Write data to the database
  // const eventRef = await addDoc(eventsCollection, {
  //   title: "Anaya Dev Test",
  //   uri,
  // });

  return id;
}

export async function addEventToCalendar() {
  const eventName = "Sample Event";
  const eventStartDate = new Date("2023-03-30T09:00:00-07:00");
  const eventEndDate = new Date("2023-03-30T11:00:00-07:00");
  const eventLocation = "123 Main St, Anytown, USA";
  const eventDescription = "This is a sample event description.";

  const link = await generateICalEvent(
    eventName,
    eventStartDate,
    eventEndDate,
    eventLocation,
    eventDescription
  );
}

export async function generateWhatsAppLink(params) {
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventStartDate,
    eventEndDate,
    eventStartHour,
    eventEndHour,
  } = params;

  // const eventStartDate = new Date("2023-03-30T09:00:00-07:00");
  // const eventEndDate = new Date("2023-03-30T11:00:00-07:00");
  let start, end;
  if (!eventStartHour || !eventEndHour) {
    start = eventStartDate;
    end = eventEndDate;
  } else {
    start = moment(
      moment(eventStartDate).format("YYYY-MM-DD") +
        "T" +
        moment(eventStartHour).format("HH:mm:ss")
    ).format("YYYYMMDD[T]HHmmss[Z]");
    end = moment(
      moment(eventEndDate).format("YYYY-MM-DD") +
        "T" +
        moment(eventEndHour).format("HH:mm:ss")
    ).format("YYYYMMDD[T]HHmmss[Z]");
  }

  console.log("concatStartDate", start);
  const idCal = await generateICalEvent(
    eventName,
    start,
    end,
    eventLocation,
    eventDescription
  );
  // const querySnapshot = await getDocs(eventsCollection);
  // console.log("querySnapshot", querySnapshot);
  // querySnapshot.find((doc) => {
  //   console.log("docu event", doc);
  // });
  const whatsappLink = config.url + "/calendar?idCal=" + idCal;
  return whatsappLink;
}
