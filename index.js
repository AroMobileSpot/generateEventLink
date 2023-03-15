function generateICalEvent(eventName, eventStartDate, eventEndDate, eventLocation, eventDescription) {
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
      "END:VCALENDAR"
    ].join("\r\n");
  
    const uri = "data:text/calendar;charset=utf8," + encodeURIComponent(content);
    const link = document.createElement("a");

    link.href = uri;
    link.setAttribute("download", eventName + ".ics");
    link.innerHTML = "Add to Calendar";
    return uri;
}

function addEventToCalendar() {
    const eventName = "Sample Event";
    const eventStartDate = new Date("2023-03-17T09:00:00-07:00");
    const eventEndDate = new Date("2023-03-17T11:00:00-07:00");
    const eventLocation = "123 Main St, Anytown, USA";
    const eventDescription = "This is a sample event description.";
  
    const link = generateICalEvent(eventName, eventStartDate, eventEndDate, eventLocation, eventDescription);
    
}

function generateWhatsAppLink() {
    const eventName = "Sample Event";
    const eventStartDate = new Date("2023-03-17T09:00:00-07:00");
    const eventEndDate = new Date("2023-03-17T11:00:00-07:00");
    const eventLocation = "123 Main St, Anytown, USA";
    const eventDescription = "This is a sample event description.";

    const icalUrl = generateICalEvent(eventName, eventStartDate, eventEndDate, eventLocation, eventDescription);
    const whatsappLink = 'https://aromobilespot.github.io/generateEventLink/?ical=' +encodeURIComponent(icalUrl);
    const resultpara = document.getElementById('resultLink');
    resultpara.innerText = whatsappLink
    return whatsappLink;
}

document.addEventListener("DOMContentLoaded", function() {
    const queryParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const pair of queryParams.entries()) {
      params[pair[0]] = pair[1];
    }
    const {ical} = params
    const intentURI = encodeURIComponent(ical);
    if(ical){
        const windowName = "_blank";
        const windowFeatures = "width=600,height=400";
        window.open(intentURI, windowName, windowFeatures)
    }
});