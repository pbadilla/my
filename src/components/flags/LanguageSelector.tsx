import React, { useState } from "react";
import { FlagIcon } from "react-flag-kit";

import Button from "@components/common/Button";

import "@styles/flags.scss";

const languages = [
  { code: "en", label: "English", country: "GB" },
  { code: "de", label: "Deutsch", country: "DE" },
  { code: "fr", label: "Français", country: "FR" },
];

export const LanguageSelector: React.FC = () => {
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="language-selector">
      <Button
        className="nav-button"
        dataTestId="languageSelector-button-header"
        icon={<FlagIcon code={selected.country} size={20} />}
        onClick={() => setOpen(!open)} // <-- toggle dropdown
      />
      {open && (
        <ul className="dropdown">
          {languages.map((lang) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <li
              key={lang.code}
              onClick={() => {
                setSelected(lang);
                setOpen(false); // close after selection
              }}
              className="dropdown-item"
            >
              <FlagIcon code={lang.country} size={20} /> {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
