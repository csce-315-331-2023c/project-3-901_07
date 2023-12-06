import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "../components/carousel";
import Footer from "../components/footer";
import "./styles.css";

/**
 * Landing page component.
 * @returns {JSX.Element} JSX Element representing the Landing page.
 */
function Landing() {
  const [translateText, setTranslateText] = useState("");
  const [translateNum, setTranslateNum] = useState(0);

  /**
   * Handles the button click to navigate to the translation page.
   */
  const handleButtonClick = () => {
    navigate("/Translate");
  };

  const translationOptions = [
    "Translate",
    "Traduire",
    "Übersetzen",
    "Tradurre",
    "Traducir",
    "Vertalen",
    "ترجمة",
    "翻訳する",
    "번역",
    "翻譯",
    "תרגם",
    "Перевести",
    "Traduzir",
    "Tłumaczyć",
    "Μεταφράστε",
    "Traduksi",
    "Terjemahkan",
    "ਅਨੁਵਾਦ",
    "மொழிபெயர்",
    "అనువదించండి",
    "ترجمه کردن",
    "परिभाषित करा",
    "अनुवाद करना",
    "অনুবাদ করুন",
    "ဘာသာပြန်ဆိုခြင်း",
    "បកប្រែ",
    "ແປພາສາ",
    "پیچھے چلا جا",
    "ಅನುವಾದಿಸಿ",
    "വിവർത്തനം",
    "অনুবাদ",
    "Vertaal",
    "ПЕРЕВЕСТИ",
    "Перекласти",
    "Targum",
    "ترجمه کریں",
    "Թարգմանել",
    "Metranslate",
    "Traduco",
    "Vāk",
    "Translate taweya",
    "평촌국제",
    "അനുവാദിക്കുക",
    "Iwe alayé",
    "翻訳",
    "Tafsiri",
    "Laybhras",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      changeText();
    }, 1000);

    return () => clearInterval(interval);
  }, [translateNum]); // Added translateNum to the dependency array
  const navigate = useNavigate();

  /**
   * Changes the text and sets it to be translated.
   */
  const changeText = () => {
    const next = (translateNum + 1) % translationOptions.length;
    console.log(next);
    setTranslateNum(next);
    setTranslateText(translationOptions[next]);
  };

  return (
    <div className="Landing">
      <ImageCarousel />

      <div className="about-us">
        <h4>About Us</h4>
        <p>
          Mr. Cheng Kai-Lung, the founder of Sharetea, was working in the film
          and TV industry as a director in 1992. Although being a director seems
          like one of the most glamorous jobs in the world, he was not satisfied
          yet. He quit his job and started his own tea street vendor business.
          At first, he encountered many hardships, but instead of giving up, he
          deeply believed “when you have strong faith, big thing happens”. After
          all the hard work he put in, Sharetea was adored by the crowd, and
          that was how the first Sharetea store got started.
        </p>
      </div>
      <button className="T" onClick={handleButtonClick}>
        {translateText}
      </button>
      <Footer />
    </div>
  );
}

export default Landing;
