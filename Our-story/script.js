const reasons = [
  {
    title: "You would never go hungry",
    answer: "I can cook. Not Michelin star level yet but definitely good enough that you would never go hungry around me.",
    image: "img1.jpg"
  },
  {
    title: "If you ever feel distant",
    answer: "If you ever feel distant I wouldn't panic. I would just find new ways to make you fall for me again.",
    image: "img2.jpg"
  },
  {
    title: "Practical life benefits",
    answer: "If you're tired I will massage your feet. If you're hurt I can carry you. If you're stressed we can always go for ice cream.",
    image: "img3.jpg"
  },
  {
    title: "If you ever get lost",
    answer: "If you ever feel lost I would search through every corner of this world to find you and give you enough reasons to stay.",
    image: "img4.jpg"
  },
  {
    title: "My family would adore you",
    answer: "I'm the most adored child in my family which means if you came home with me as my better half they would probably love you even more than me.",
    image: "img5.jpg"
  },
  {
    title: "You would always feel at home",
    answer: "If you came to my house you would never feel like an outsider.",
    image: "img6.jpg"
  },
  {
    title: "My sister advantage",
    answer: "I have a big sister and she has a talent for making people feel welcome.",
    image: "img7.jpg"
  },
  {
    title: "My mom's cooking",
    answer: "My mom makes incredible food and I got my cooking skills from her. Spending too much time around her kitchen might make you gain weight.",
    image: "img8.jpg"
  },
  {
    title: "My dad",
    answer: "My dad is one of the happiest people I know. If you met him he would treat you like his own daughter.",
    image: "img9.jpg"
  },
  {
    title: "Emergency services included",
    answer: "If you twist your ankle congratulations. You now have a personal transportation service.",
    image: "img10.jpg"
  },
  {
    title: "One final thing",
    answer: "I have a big family where nobody gets left out. If you were part of it you would always have people around you who genuinely care.",
    image: "img11.jpg"
  }
];

let currentIndex = 0;
let answerOpened = false;
let musicStarted = false;

const introScreen = document.getElementById("introScreen");
const openCaseBtn = document.getElementById("openCaseBtn");
const mainContent = document.getElementById("mainContent");

const loaderScreen = document.getElementById("loaderScreen");
const loaderFill = document.getElementById("loaderFill");
const loaderText = document.getElementById("loaderText");

const reasonBtn = document.getElementById("reasonBtn");
const answerBox = document.getElementById("answerBox");
const answerText = document.getElementById("answerText");
const nextBtn = document.getElementById("nextBtn");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const progressWrap = document.getElementById("progressWrap");

const card = document.getElementById("card");
const finalScreen = document.getElementById("finalScreen");

const restartBtn = document.getElementById("restartBtn");
const yesBtn = document.getElementById("yesBtn");
const talkBtn = document.getElementById("talkBtn");
const finalReply = document.getElementById("finalReply");
const closingLine = document.getElementById("closingLine");

const clickHint = document.getElementById("clickHint");

const bgMusic = document.getElementById("bgMusic");
const floatingLayer = document.getElementById("floatingLayer");
const musicToggle = document.getElementById("musicToggle");

const reasonImage = document.getElementById("reasonImage");
const imageWrap = document.getElementById("imageWrap");

const mainTitle = document.getElementById("mainTitle");
const titleText = "Why Neha should give me one more chance";

const endingScreen = document.getElementById("endingScreen");
const endingTitle = document.getElementById("endingTitle");
const endingText = document.getElementById("endingText");
const endingRestartBtn = document.getElementById("endingRestartBtn");

const sceneTransition = document.getElementById("sceneTransition");

const secretTrigger = document.getElementById("secretTrigger");
const secretMessage = document.getElementById("secretMessage");

function typeTitle() {
  mainTitle.textContent = "";
  let i = 0;

  function type() {
    if (i < titleText.length) {
      mainTitle.textContent += titleText.charAt(i);
      i++;
      setTimeout(type, 40);
    }
  }

  type();
}

function typeEnding(title, text) {
  endingTitle.textContent = "";
  endingText.textContent = "";
  endingRestartBtn.classList.add("hidden");

  let i = 0;
  let j = 0;

  function typeTitlePart() {
    if (i < title.length) {
      endingTitle.textContent += title.charAt(i);
      i++;
      setTimeout(typeTitlePart, 45);
    } else {
      setTimeout(typeTextPart, 250);
    }
  }

  function typeTextPart() {
    if (j < text.length) {
      endingText.textContent += text.charAt(j);
      j++;
      setTimeout(typeTextPart, 28);
    } else {
      endingRestartBtn.classList.remove("hidden");
    }
  }

  typeTitlePart();
}

function fadeInMusic() {
  bgMusic.volume = 0.05;
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {
      let vol = 0.05;
      const interval = setInterval(() => {
        vol += 0.05;
        if (vol >= 0.5) {
          vol = 0.5;
          clearInterval(interval);
        }
        bgMusic.volume = vol;
      }, 200);
    }).catch((error) => {
      console.log("Music blocked:", error);
    });
  }
}

function spawnFloating() {
  const emojis = ["💫", "✨", "🤍", "⭐"];

  for (let i = 0; i < 6; i++) {
    const e = document.createElement("div");
    e.className = "float-emoji";
    e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    e.style.left = Math.random() * 90 + "%";
    e.style.fontSize = 16 + Math.random() * 10 + "px";

    floatingLayer.appendChild(e);

    setTimeout(() => {
      e.remove();
    }, 3000);
  }
}

function updateProgress() {
  progressText.textContent = currentIndex + 1 + " / " + reasons.length;
  const percent = ((currentIndex + 1) / reasons.length) * 100;
  progressFill.style.width = percent + "%";
}

function loadReason() {
  answerOpened = false;

  reasonBtn.textContent = reasons[currentIndex].title;
  answerText.textContent = "";

  answerBox.classList.add("hidden");
  nextBtn.classList.add("hidden");

  imageWrap.classList.add("hidden");
  imageWrap.classList.remove("show");

  reasonImage.src = reasons[currentIndex].image;
  reasonImage.alt = reasons[currentIndex].title;

  clickHint.classList.remove("hidden");
  clickHint.textContent = "Tap the point above — my defense is ready.";

  updateProgress();
}

function playSceneTransition() {
  sceneTransition.classList.remove("hidden");
  sceneTransition.classList.remove("active");
  void sceneTransition.offsetWidth;
  sceneTransition.classList.add("active");

  setTimeout(() => {
    sceneTransition.classList.add("hidden");
  }, 700);
}

function startLoaderSequence() {
  const loaderMessages = [
    "Please remain calm while the case is being prepared.",
    "Collecting evidence of effort...",
    "Arranging reasons in emotionally effective order...",
    "Finalizing presentation..."
  ];

  loaderScreen.classList.remove("hidden");
  loaderFill.style.width = "0%";
  loaderText.textContent = loaderMessages[0];

  let step = 0;
  const widths = [20, 45, 72, 100];

  const interval = setInterval(() => {
    loaderFill.style.width = widths[step] + "%";
    loaderText.textContent = loaderMessages[step] || loaderMessages[loaderMessages.length - 1];
    step++;

    if (step >= widths.length) {
      clearInterval(interval);

      setTimeout(() => {
        loaderScreen.classList.add("hidden");
        mainContent.classList.remove("hidden");
        musicToggle.classList.remove("hidden");
        typeTitle();
        loadReason();
      }, 350);
    }
  }, 450);
}

function openCase() {
  if (!musicStarted) {
    fadeInMusic();
    musicStarted = true;
  }

  introScreen.classList.add("hide");

  setTimeout(() => {
    startLoaderSequence();
  }, 450);
}

function showEndingScreen() {
  finalScreen.classList.add("hidden");
  endingScreen.classList.remove("hidden");

  typeEnding(
    "Jokes aside...",
    "I made all of this because you matter to me more than I know how to explain in normal words. So I built a whole case file instead. If nothing else, I just wanted you to feel that."
  );
}

openCaseBtn.addEventListener("click", openCase);

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    musicToggle.textContent = "🔊";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🔇";
  }
});

reasonBtn.addEventListener("click", () => {
  answerOpened = true;

  answerText.textContent = reasons[currentIndex].answer;
  answerBox.classList.remove("hidden");

  reasonImage.src = reasons[currentIndex].image;
  reasonImage.alt = reasons[currentIndex].title;
  imageWrap.classList.remove("hidden");
  imageWrap.classList.add("show");

  clickHint.classList.add("hidden");

  spawnFloating();

  if (currentIndex < reasons.length - 1) {
    nextBtn.textContent = "Next Point";
  } else {
    nextBtn.textContent = "See Final Verdict";
  }

  nextBtn.classList.remove("hidden");
});

nextBtn.addEventListener("click", () => {
  if (!answerOpened) return;

  playSceneTransition();

  if (currentIndex < reasons.length - 1) {
    setTimeout(() => {
      currentIndex++;
      loadReason();
    }, 220);
  } else {
    setTimeout(() => {
      card.classList.add("hidden");
      progressWrap.classList.add("hidden");
      finalScreen.classList.remove("hidden");
      finalScreen.classList.add("show");
    }, 220);
  }
});

yesBtn.addEventListener("click", () => {
  finalReply.textContent = "Excellent decision. Strong judgment.";
  finalReply.classList.remove("hidden");
  closingLine.classList.remove("hidden");

  setTimeout(showEndingScreen, 1800);
});

talkBtn.addEventListener("click", () => {
  finalReply.textContent = "That works for me. A real conversation was always the goal.";
  finalReply.classList.remove("hidden");
  closingLine.classList.remove("hidden");

  setTimeout(showEndingScreen, 1800);
});

secretTrigger.addEventListener("click", () => {
  secretMessage.classList.remove("hidden");
  secretTrigger.textContent = "Okay fine… you found the secret reason.";
});

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  answerOpened = false;

  finalReply.classList.add("hidden");
  finalReply.textContent = "";
  closingLine.classList.add("hidden");

  secretMessage.classList.add("hidden");
  secretTrigger.textContent = "P.S. There may be one secret reason hidden here.";

  finalScreen.classList.add("hidden");
  card.classList.remove("hidden");
  progressWrap.classList.remove("hidden");

  loadReason();
});

endingRestartBtn.addEventListener("click", () => {
  endingScreen.classList.add("hidden");
  currentIndex = 0;
  answerOpened = false;

  finalReply.classList.add("hidden");
  finalReply.textContent = "";
  closingLine.classList.add("hidden");

  secretMessage.classList.add("hidden");
  secretTrigger.textContent = "P.S. There may be one secret reason hidden here.";

  finalScreen.classList.add("hidden");
  card.classList.remove("hidden");
  progressWrap.classList.remove("hidden");

  loadReason();
});