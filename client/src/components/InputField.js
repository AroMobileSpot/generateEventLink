import React from "react";
import Datetime from "react-datetime";
import moment from "moment";
import "moment/locale/fr";

export default ({
  placeholder,
  onChange,
  defaultValue,
  name,
  typeRender,
  className,
  innerProps,
}) => {
  const renderTextField = () => {
    return (
      <div className="input-container">
        <input
          type={"text"}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          name={name}
          className={className}
        />
      </div>
    );
  };
  const renderTextArea = () => {
    return (
      <textarea
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        name={name}
        className={className}
      />
    );
  };
  const renderDatatme = () => {
    return (
      <Datetime
        locale="fr-fr"
        inputProps={{ name, placeholder, className }}
        onChange={(e) => {
          onChange({ target: { name, value: moment(e).format() } });
        }}
        initialValue={new Date()}
        isValidDate={(current, selected) => {
          return current.isSameOrAfter(selected);
        }}
        {...innerProps}
      />
    );
  };
  switch (typeRender) {
    case "text":
      return renderTextField();
    case "datetime":
      return renderDatatme();
    case "textarea":
      return renderTextArea();
    default:
      return renderTextField();
  }
};
