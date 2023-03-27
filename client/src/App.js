import React, { useState } from "react";
import { generateWhatsAppLink } from "./utils/generateLink";
import InputField from "./components/InputField";
import moment from "moment";
export const App = () => {
  const [calendarLink, setLink] = useState("");
  const [formParams, setFormParams] = useState({
    eventStartDate: moment().format(),
    eventEndDate: moment().format(),
  });
  const [resultCopy, setCopy] = useState({});
  const onClick = async () => {
    console.log("formParams", formParams);
    const result = await generateWhatsAppLink(formParams);
    setLink(result);
  };

  const copyPath = async (path) => {
    navigator.clipboard
      .writeText(path)
      .then(() => {
        console.log("Text copied to clipboard");
        setCopy({ message: "Url copiée" });
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
        setCopy({ error: "Un problème est survenu" });
        setTimeout(() => setCopy({}), 2000);
      });
  };

  const onChange = (e) => {
    setFormParams((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <div className="form-container">
        <div className="form-content">
          <h1 className="form-title">Anaya Event Manager</h1>
          <InputField
            onChange={onChange}
            placeholder="Anaya Event Title..."
            name={"eventName"}
            className="textField"
          />
          <InputField
            onChange={onChange}
            placeholder="Emplacement de l'évènement..."
            name={"eventLocation"}
            className="textField"
          />
          <InputField
            onChange={onChange}
            placeholder="Déscription de l'évènement..."
            name={"eventDescription"}
            typeRender="textarea"
            className="textField"
          />
          <div className="datepicker-container">
            <div className="datetime-container">
              <InputField
                onChange={onChange}
                placeholder="Début de l'évènement"
                typeRender="datetime"
                name={"eventStartDate"}
                className="datetime-custom"
                innerProps={{ timeFormat: false }}
              />
              <InputField
                onChange={onChange}
                placeholder="Début de l'évènement"
                typeRender="datetime"
                name={"eventStartHour"}
                className="datetime-custom hour"
                innerProps={{ dateFormat: false }}
              />
            </div>
            <div className="datetime-container">
              <InputField
                onChange={onChange}
                placeholder="Fin de l'évènement"
                typeRender="datetime"
                name={"eventEndDate"}
                className="datetime-custom date"
                innerProps={{ timeFormat: false }}
              />
              <InputField
                onChange={onChange}
                placeholder="Hour"
                typeRender="datetime"
                name={"eventEndHour"}
                className="datetime-custom hour"
                innerProps={{ dateFormat: false }}
              />
            </div>
          </div>
          <div className="button primary" onClick={onClick}>
            Générer un lien
          </div>
          <span className="calendarLink" onClick={() => copyPath(calendarLink)}>
            {calendarLink}
          </span>
          {
            <span className={`messageCopy ${Object.keys(resultCopy)[0]}`}>
              {resultCopy.message || resultCopy.error || ""}
            </span>
          }
        </div>
      </div>
    </>
  );
};
