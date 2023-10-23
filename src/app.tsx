import IconArrow from "./assets/icon-arrow.svg";
import { useState } from "preact/hooks";
import {
  dateDifference,
  validateDay,
  validateMonth,
  validateYear,
} from "./utils";
import InputGroup from "./components/InputGroup";

export function App() {
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [formErrors, setFormErrors] = useState<formErrors>({
    day: "",
    month: "",
    year: "",
  });

  const [result, setResult] = useState({
    years: -1,
    months: -1,
    days: -1,
  });

  // const validateDate = (name: string, value: string) => {
  //   switch (name) {
  //     case "day":
  //       return validateDay(parseInt(value));
  //     case "month":
  //       return validateMonth(parseInt(value));
  //     case "year":
  //       return validateYear(parseInt(value));
  //     default:
  //       return "";
  //   }
  // };

  const validateDate = (day: string, month: string, year: string) => {
    let dayError = validateDay(parseInt(day));
    let monthError = validateMonth(parseInt(month));
    let yearError = validateYear(parseInt(year));

    return {
      day: dayError,
      month: monthError,
      year: yearError,
    };
  };

  const handleChange = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: "",
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const errors = validateDate(
      name == "day" ? value : formData.day,
      name === "month" ? value : formData.month,
      name === "year" ? value : formData.year
    );

    setFormErrors((prevFormData) => ({
      ...prevFormData,
      ...errors,
    }));
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    const { day, month, year } = formData;

    if (!day || !month || !year) {
      setFormErrors({
        day: !day ? "empty" : "",
        month: !month ? "empty" : "",
        year: !year ? "empty" : "",
      });

      return;
    }

    const errors = validateDate(day, month, year);

    setFormErrors(errors);

    const [ageDay, ageMonth, ageYear] = dateDifference(
      parseInt(day),
      parseInt(month),
      parseInt(year)
    );

    setResult({
      years: ageYear,
      months: ageMonth,
      days: ageDay,
    });
  };

  return (
    <div className="age-calculator">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-groups">
          <InputGroup
            label="Day"
            name="day"
            id="day"
            placeholder="DD"
            value={formData.day}
            onInput={handleChange}
            error={formErrors.day}
          />
          <InputGroup
            label="Month"
            name="month"
            id="month"
            placeholder="MM"
            value={formData.month}
            onInput={handleChange}
            error={formErrors.month}
          />
          <InputGroup
            label="Year"
            name="year"
            id="year"
            placeholder="YYYY"
            value={formData.year}
            onInput={handleChange}
            error={formErrors.year}
          />
        </div>

        <div className="form__submit">
          <button class="button" type="submit">
            <img className="button__icon" src={IconArrow} alt="" />
          </button>
        </div>
      </form>

      <div>
        <p class="result">
          <span>{result.years == -1 ? "--" : result.years}</span> years <br />
          <span>{result.months == -1 ? "--" : result.months}</span> months{" "}
          <br />
          <span>{result.days == -1 ? "--" : result.days}</span> days
        </p>
      </div>
    </div>
  );
}
