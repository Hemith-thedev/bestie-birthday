import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Crown, Wand2, Archive, Heart, Send, HeartIcon } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function App() {
  const [bestieName, setBestieName] = useState("");
  const [nameInput, setNameInput] = useState("");

  const [signature, setSignature] = useState("- Hemith");
  const [signatureInput, setSignatureInput] = useState("");

  const [complimentIdx, setComplimentIdx] = useState(0);
  const [complimentOpacity, setComplimentOpacity] = useState(1);

  const [memoryIdx, setMemoryIdx] = useState(0);
  const [memoryOpacity, setMemoryOpacity] = useState(1);

  const [candlesBlown, setCandlesBlown] = useState(false);

  const [disableSign, setDisableSign] = useState(false);

  // Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    icon: "🎉",
  });

  const [namePopup, setNamePopup] = useState({
    isOpen: false,
    name: "",
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 1000,
      spread: 5000,
      origin: { y: 1.1 },
      colors: ["#ff00ff", "#af00af", "#af0057", "#ffe44e"],
    });
  };

  const blowCandles = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      triggerConfetti();
    } else {
      setCandlesBlown(false);
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem("bestie-birthday-name");
    if (storedName) {
      setBestieName(storedName);
      setNamePopup((prev) => ({ ...prev, isOpen: false }));
      blowCandles();
      setCandlesBlown(false);
    } else {
      setNamePopup((prev) => ({
        ...prev,
        isOpen: true,
      }));
    }
  }, []);

  useEffect(() => {
    if (bestieName.trim()) {
      localStorage.setItem("bestie-birthday-name", bestieName);
      setNamePopup((prev) => ({
        ...prev,
        isOpen: false,
      }));
    } else {
      setNamePopup((prev) => ({
        ...prev,
        isOpen: true,
      }));
    }
  }, [bestieName]);

  // Data Arrays
  const compliments = [
    "Exam disaney gottaitu, neenu kiladi anta 😂",
    "Neenu coding maadodu ond sari kuda nodilla 😒",
    "Yavag nan kalsiro reels nodthiya? neenu reels kalsodu kuda martbutta? 😭",
    "Naavu avaaga reels obrigobburu share maadkontidvi, gotta? 😂",
    "Atleast ondu treat kodsana ankode, but... situation nan kainal irlilla. 😭",
  ];

  const yourplayfulside = [
    "😒 Avagavaga neenu matte Sukanya nanna aatadkolodu, prends anta bitte... otherwise, direct... enu illa bidu!",
    "Nin mukha nodudre 'Fahhh' alla, 'Wahh' anbekansutte. 🤯",
    "Ninge ond help maadidini, gnyapusko! 😎",
    "Aavattu neenu nin fav song ge dance madidiya nodu, fix agbutide nan mindalli! 😎",
    "Ninge talent ide, use madu... in fact, brain kuda ide anko! 😜",
    "your best thing is, academics nal iro topics bagge nan jothe atleast discuss kuda maadilla! 😜",
  ];

  // Handlers
  const showModal = (title, message, icon) => {
    setModal({ isOpen: true, title, message, icon });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleUpdateBestieName = () => {
    if (nameInput.trim()) {
      setBestieName(nameInput.trim());
      setNameInput("");
    } else {
      showModal("⚠️ Oops!", "Please enter a valid name first!", "💡");
    }
  };

  const handleSign = async () => {
    const templateParams = {
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      name: bestieName,
      sign_name: signatureInput,
    };
    try {
      const response = await emailjs.send(
        "service_gm8wg12",
        "template_644rewk",
        templateParams,
        "BgIpY5j1Wte3SXvQ9",
      );
    } catch (error) {
      console.warn("Failed to sent the mail!", error);
    }
  };

  const handleUpdateSignature = () => {
    if (signatureInput.trim()) {
      handleSign();
      showModal(
        "Note Signed!",
        `Nin signature "${signatureInput.trim()}" nange siktu!`,
        "🥳",
      );
      setDisableSign(true);
      triggerConfetti();
    } else {
      showModal("⚠️ Oops!", "Arey, Hesaru haaku bestie!", "😱");
    }
  };

  const generateCompliment = () => {
    setComplimentOpacity(0);
    setTimeout(() => {
      setComplimentIdx((prev) => (prev + 1) % compliments.length);
      setComplimentOpacity(1);
    }, 150);
  };

  const generateMemory = () => {
    setMemoryOpacity(0);
    setTimeout(() => {
      // Random voddu! Line-by-line sequence-lo sweet memories osthai 🥰
      setMemoryIdx((prev) => (prev + 1) % yourplayfulside.length);
      setMemoryOpacity(1);
    }, 150);
  };

  return (
    <div
      className={`relative max-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-indigo-100 text-slate-800 select-none selection:bg-purple-600 selection:text-white ${namePopup.isOpen ? "overflow-hidden" : "overflow-x-hidden overflow-y-auto"} font-sans`}
    >
      {/* Header */}
      <header className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <div className="flex max-w-full items-center space-x-2 overflow-hidden">
          <span className="shrink-0 text-3xl">
            <Heart className="text-purple-600" fill="#9810fa" />
          </span>
          <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text pr-4 text-transparent">
            <span className="truncate text-3xl font-bold">Purple Girl</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center space-x-3">
          <div className="flex items-center space-x-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 shadow-md">
            <Crown className="h-4 w-4" />
            <span>VIP</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-4xl px-4 pb-0 lg:pb-16">
        {/* Banner Section */}
        <section className="relative py-10 text-center">
          <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 transform animate-pulse rounded-full bg-purple-400/50 blur-3xl"></div>

          <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text px-4 py-1.5 text-xs font-bold tracking-wide text-transparent sm:text-sm">
            ✨ TODAY IS ALL ABOUT YOU~ ✨
          </div>

          <h1 className="mb-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-2 text-2xl leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="font-extrabold">Happy Birthday,</span>
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 bg-clip-text pr-4 text-transparent">
              <span className="max-w-full leading-relaxed font-bold break-all">
                {bestieName}!
              </span>
            </span>
          </h1>

          <p className="mx-auto max-w-xl px-2 text-sm leading-relaxed font-medium text-slate-600 sm:text-base md:text-lg lg:mb-8">
            To my ultimate friend, keeper of all secrets, and monkey in pure
            chaos. Let's make this day unforgettable!
          </p>
        </section>

        {/* Interactive Cards Grid */}
        <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Compliment Generator */}
          <div className="flex flex-col justify-between rounded-3xl border border-purple-200 bg-white/90 p-6 shadow-xl backdrop-blur-md">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-xl font-bold text-purple-600 shadow-inner">
                ⚡
              </div>
              <h3 className="mb-2 text-xl font-bold">Your Hype Generator</h3>
              <p className="mb-4 text-sm font-medium text-slate-600">
                Nin bestfriend maatugalu nodu
              </p>
            </div>
            <div className="mb-4 flex min-h-[80px] items-center justify-center rounded-2xl border border-purple-100 bg-purple-50/80 p-4 text-center">
              <p
                style={{
                  opacity: complimentOpacity,
                  transition: "opacity 0.2s ease-in-out",
                }}
                className="text-sm font-semibold text-purple-900 sm:text-base"
              >
                "{compliments[complimentIdx]}"
              </p>
            </div>
            <button
              onClick={generateCompliment}
              className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-purple-700"
            >
              <Wand2 className="h-4 w-4" />
              <span>Generate Mado</span>
            </button>
          </div>

          {/* Memory Lane */}
          <div className="flex flex-col justify-between rounded-3xl border border-purple-200 bg-white/90 p-6 shadow-xl backdrop-blur-md">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-100 text-xl font-bold text-fuchsia-600 shadow-inner">
                😆
              </div>
              <h3 className="mb-2 text-xl font-bold">Your Playful Side</h3>
              <p className="mb-4 text-sm font-medium text-slate-600">
                nam moments inda kelondu lines
              </p>
            </div>
            <div className="mb-4 flex min-h-[80px] items-center justify-center rounded-2xl border border-fuchsia-100 bg-fuchsia-50/80 p-4 text-center">
              <p
                style={{
                  opacity: memoryOpacity,
                  transition: "opacity 0.2s ease-in-out",
                }}
                className="text-sm font-semibold text-fuchsia-900 sm:text-base"
              >
                "{yourplayfulside[memoryIdx]}"
              </p>
            </div>
            <button
              onClick={generateMemory}
              className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-xl bg-fuchsia-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-fuchsia-700"
            >
              <Archive className="h-4 w-4" />
              <span>Generate madu</span>
            </button>
          </div>
        </section>

        {/* Birthday Cake Section */}
        <section className="relative mb-12 overflow-hidden rounded-3xl border border-purple-200 bg-white/90 p-6 text-center shadow-xl backdrop-blur-md sm:p-8">
          <div
            className={`pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-400 blur-3xl ${candlesBlown ? "opacity-70" : "opacity-30"} transition-all`}
          ></div>
          <div
            className={`pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-purple-400 blur-3xl ${candlesBlown ? "opacity-70" : "opacity-30"} transition-all`}
          ></div>

          <div className="mb-3 inline-block text-5xl sm:text-6xl">🎂</div>
          <h3 className="mb-2 text-2xl font-bold">
            {candlesBlown ? "Whoosh!" : "Blow Out The Candles!"}
          </h3>
          <p className="mb-6 text-sm font-medium text-slate-600 sm:text-base">
            {candlesBlown
              ? "✨ Candles blown out! 🎂🎉"
              : "🎂 Candles are lit... Blow them!"}
          </p>
          <button
            onClick={blowCandles}
            className="cursor-pointer rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105 active:scale-95 sm:text-base"
            disabled={candlesBlown}
          >
            {candlesBlown ? "Make a wish 😇" : "Blow Candles"}
          </button>
        </section>

        {/* Special Note Card */}
        <section className="relative mb-12 overflow-hidden rounded-3xl border border-purple-200 bg-white/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <div className="pointer-events-none absolute -right-4 -bottom-6 hidden max-w-[80%] truncate overflow-hidden p-4 text-6xl font-bold tracking-widest text-purple-600/10 select-none sm:top-0 sm:right-0 sm:p-8 sm:text-8xl lg:flex">
            {bestieName}
          </div>

          <h2 className="relative z-10 mb-4 flex items-center space-x-2 text-2xl font-bold break-words">
            <span>A Special Note For You</span>
          </h2>

          <div className="relative z-10 space-y-4 text-base leading-relaxed font-medium break-words text-slate-700 sm:text-lg">
            <p>
              <span className="inline lg:hidden">
                Dear{" "}
                <span className="font-bold break-all text-purple-600">
                  {bestieName}
                </span>
              </span>
              <span className="hidden lg:inline">
                Dear{" "}
                <span className="font-bold break-all text-purple-600">
                  Bestie
                </span>
              </span>
              ,
            </p>
            <p className="text-md">
              ✨ Neenu nan life nalli banda nantara, nan life full peace aagi
              ide kano... aadre, nin senior aagbutti doddu mistake maadidini
              anstaithe 😆, nange ene aadru nanigoskara nintidya, of course
              nanna tumba naksidiya 😄, tumba care madidiya... just like my
              special... 'just like' enu?, neenu nan special kano! 😌... ninige
              ansirbohudu, 'yenu isthond messages' anta... because... you are
              the one who respond and answer me. Neenu respond madthiya, answer
              madthiya anta alla... neenu nan bestfriend anta ondu concern
              kano!... 'parents aamele friends' antare alwa!... neenu friend
              alla, nan bestfriend neenu... nan bestie neenu!
            </p>
            <p className="text-md">
              Nanigiro vibe ninigidiyo? ninigiro vibe nanigidiyo gotilla 😂
              because... ibburu maatabekare yavaglu cool aagi maatadtivi thane
              😎... obrigobburu troll madkondi, pakkadalirourna troll madi, you
              remember those days? avaagavaga college garden nal sumne greetings
              madkondi... nan gaming mouse na neenu try kuda maadilla, bad
              girl... sorry, good girl! plus... neenu kuda free fire aadthiya...
              aadre ond match kuda aadilla nanjothe, bad girl 😒... bidu neenu
              yavaglu good girl! 😇... I can understand... neenu kuda syllabus
              naa complete madbeku, academic inda free aagbeku anta... good
              girl! at least free fire nalli request accept madidiya
            </p>
            <p className="text-md">
              Ee varshadalli, neenu ankondirudu ninige sigali, olle luck sigali,
              nin life goskara, future goskara hosa hosadaagi enaara kali... of
              course ninge Full Stack nalli doubts idre nange kelu... I will
              help you... nan life ge bandu, ond life andre ingu kuda irbeku
              anta nanna encourage madidiya, as you like a line "Idre nemdiyag
              irbek" 😎. So, I am happy and proud to have you in my life as a
              BESTIE. Once again... I wish you many more happy returns of the
              day yaar!
            </p>
            <div className="pt-2">
              <p className="text-xl text-purple-600 italic">
                Your bestu <span className="font-bold">monkey</span>
              </p>
              <p className="mt-1 text-sm font-medium wrap-break-word text-slate-500 italic">
                - Hemith
              </p>
            </div>
          </div>

          {/* Custom Signature Editor */}
          <div className="relative z-10 mt-6 flex flex-col items-center justify-between gap-4 border-t border-purple-100 pt-6 sm:flex-row">
            <span className="shrink-0 text-sm font-medium text-slate-500">
              {disableSign
                ? "Thank you Bestie ~"
                : "Nin autograph na togolilla, illi haaku"}
            </span>
            <div className="flex w-full flex-col items-center space-y-2 sm:w-auto sm:flex-row sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                value={signatureInput}
                disabled={disableSign}
                onChange={(e) => setSignatureInput(e.target.value)}
                placeholder="Your name..."
                className="w-full truncate rounded-xl border border-purple-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition-all focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:opacity-50 sm:w-auto"
              />
              <button
                onClick={handleUpdateSignature}
                disabled={disableSign}
                className="w-full shrink-0 cursor-pointer rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-none shadow-purple-500 transition hover:bg-purple-600 hover:shadow-lg sm:w-auto"
              >
                Sign Note ✍️
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center justify-center rounded-t-3xl bg-linear-to-r from-purple-600 via-fuchsia-600 to-indigo-600 p-8 text-center text-sm font-medium text-white shadow-[0_0_2rem,0_0_10rem] shadow-purple-600">
        <h1 className="h-fit w-fit bg-linear-to-r from-fuchsia-300 to-white bg-clip-text text-2xl text-transparent italic lg:text-3xl">
          Made with absolute hype for the best friend ever.
        </h1>
        <h1 className="text-2xl lg:text-3xl">🤗😎</h1>
      </footer>

      {/* Custom Modal */}

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm ${modal.isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-all duration-500`}
      >
        <div
          className={`w-full max-w-sm rounded-3xl border border-purple-100 bg-white p-6 text-center shadow-2xl ${modal.isOpen ? "translaye-y-0 blur-none" : "translate-y-20 blur-xl"} transition-all duration-200`}
        >
          <div className="mb-3 text-4xl">{modal.icon}</div>
          <h3 className="mb-2 text-lg font-bold text-slate-800">
            {modal.title}
          </h3>
          <p className="mb-6 text-sm font-medium text-slate-600">
            {modal.message}
          </p>
          <button
            onClick={closeModal}
            className="w-full cursor-pointer rounded-xl bg-linear-to-r from-purple-600 to-fuchsia-600 py-2.5 text-sm font-semibold text-white shadow transition"
          >
            Got it! ✨
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 mx-auto flex h-screen w-full flex-col ${namePopup.isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} items-center justify-center gap-2 border-purple-200 bg-white/90 p-3 shadow-lg backdrop-blur-md`}
      >
        <div className="flex flex-col gap-4 lg:flex-row">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your name..."
            className="flex-1 rounded-xl border border-purple-200 bg-purple-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <button
            onClick={() => {
              handleUpdateBestieName();
              triggerConfetti();
              setCandlesBlown(false);
            }}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-md transition hover:opacity-95 active:scale-95"
          >
            Personalize ✏️
          </button>
        </div>
      </div>
    </div>
  );
}
