import { useEffect } from "react";
import NavigationBar from "../components/LandingNav";
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
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <>
        <NavigationBar />
      <div id="google_translate_element"></div>
      <h4>Start building your app. Happy Coding!</h4>
      <p>
          Mr. Cheng Kai-Lung, the founder of Sharetea, was working in the film and TV industry as a director in 1992...
        </p>
    </>
  );
};

export default AB;
