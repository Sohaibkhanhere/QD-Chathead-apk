import { Category, Scripts } from './types';

export const CATEGORIES: Category[] = [
  { key: "vector", name: "Vector", color: "#ef476f" },
  { key: "digitize", name: "Digitize", color: "#ac92eb" },
  { key: "patch", name: "Patch", color: "#06d6a0" },
  { key: "convo", name: "Convo\nStarter", color: "#118ab2" },
  { key: "follow", name: "Follow\nUp", color: "#073b4c" },
];

export const SCRIPTS: Scripts = {
  vector: [
    "Hi 😊 Looking for print-ready vector artwork? We offer clean vector conversion and artwork setup for printing and custom patches.",
    "Hey! I came across your work — really liked the clean style 👏 Do you usually create your own vector files or have someone prepare them for you?",
    "Hey 😊 If you ever need properly prepared vector files for printing or patches, feel free to get in touch.",
    "I really liked one of your recent designs — the details were impressive! Have you ever turned your artwork into a vector version for printing or products?",
    "Hello 😊 We help prepare clean and accurate vector artwork for printing and custom patches. Happy to assist whenever needed.",
    "Hey! Quick question — do you handle vector conversions for your artwork yourself, or do you prefer having someone assist with that?",
    "Hey! I saw your brand’s logo — it would look awesome as a custom patch 👏 Do you already get your patches made somewhere or still exploring ideas?"
  ],

  digitize: [
    "Hey! I saw your embroidery work — really nice attention to detail 👏 Just wondering, do you usually manage the digitizing yourself or have someone assist with it?",
    "I really liked your recent embroidery design — it looks super polished! Do you normally collaborate with a regular digitizer or change depending on the project?",
    "Hi 👋 I create clean, smooth embroidery digitizing files that work well on different machines. How do you usually manage your digitizing workflow?",
    "Hey there! I focus on embroidery digitizing — mostly for logos, patches, and caps. Would you like to see how your design could look once digitized?",
    "When preparing designs for embroidery, do you already have someone who handles digitizing, or do you look for help per design?",
    "Hey 👋 just curious — when sending your artwork for embroidery, do you prefer getting it digitized locally or online?",
    "I’ve noticed that some designs can lose clarity from poor digitizing. Have you faced any stitch or machine-run issues like that?",
  ],
  patch: [
    "Hey! I make custom embroidered patches ✨ — would you be interested in a quick sample of what I can create?",
    "Hi! I create personalized patches for any style or project 🎨. Want to see some examples?",
    "Hey there! Curious — do you usually get patches made somewhere, or are you exploring ideas right now 🤔?",
    "Hi! I craft high-quality custom patches 💎. Would you like a quick quote or preview?",
    "Hey! I make patches that are perfect for jackets, bags, or hats 👕👜🎒. Interested in seeing some designs?",
    "Hi! I offer fully custom embroidery and patches 🧵. Want to check out some of my recent work?",
    "Hey! Just wondering — have you ever thought about adding custom patches to your collection or project ✂️?"
  ],

  convo: [
    "Hey! How’s your day going so far? 😊",
    "Hi 👋 Hope your day’s been good! Working on anything new lately?",
    "Hey there! How have things been on your end recently?",
    "Hi! Hope your projects are going smoothly these days.",
    "Hey! How’s the week treating you so far? 😄",
    "Hi 👋 just checking in — how’s everything going with your designs?",
    "Hey! Hope your day’s been nice so far. What’s been keeping you busy?",
  ],
  follow: [
    "Hi! Just checking in to see if you got my earlier message — it might’ve slipped by in your inbox.",
    "Hey there 😊 I know things can get a bit busy sometimes. Just wanted to confirm you received my last note.",
    "Hi 👋 not sure if the timing was right before — would another time work better to talk about it?",
    "Hey! 😊 just returning here in case my previous message didn’t go through. Happens often when inboxes fill up 😅",
    "Hi! I wanted to follow up on my earlier note — happy to share a quick example whenever it’s convenient for you.",
    "Hey 👋 just nudging this back up in case it got buried earlier. Hope everything’s been going well on your side!",
  ],
};
