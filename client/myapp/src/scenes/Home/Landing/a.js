import { useEffect } from "react";
import "./translate.css";
const AB = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    const loadGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        window.googleTranslateElementInit = googleTranslateElementInit;
      };
    };

    loadGoogleTranslateScript();
  }, []);

  return (
    <div className="translate-wrapper">
      <div className="A">Select any Language to begin.</div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default AB;
