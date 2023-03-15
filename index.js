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
    var eventName = "Sample Event";
    var eventStartDate = new Date("2023-03-17T09:00:00-07:00");
    var eventEndDate = new Date("2023-03-17T11:00:00-07:00");
    var eventLocation = "123 Main St, Anytown, USA";
    var eventDescription = "This is a sample event description.";
  
    var link = generateICalEvent(eventName, eventStartDate, eventEndDate, eventLocation, eventDescription);
    window.open(link, "_blank");
  }