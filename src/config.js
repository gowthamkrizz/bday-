/**
 * Central Configuration for Abirami's Birthday Surprise Website 💖
 * 
 * Customize all personal details, dates, memories, and texts from this single file.
 */

export const config = {
  // Recipient details
  recipientName: "Abirami",
  nickname: "Abi",

  // Birthday Configuration
  // Format: "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss"
  // Note: If you set it to a date earlier this year, the countdown automatically
  // targets next year's birthday! If it is today, it triggers the birthday celebration banner.
  // Abirami's Birthday Date (17/10/2026)
  birthdayDate: "2026-10-17T00:00:00",

  // Background Audio Configuration
  // Provide your audio file in public/audio/romantic-background.mp3
  // If the file is not yet added, the built-in Dreamy Music Box synthesizer
  // automatically plays a soothing romantic acoustic melody without error!
  audio: {
    src: "/audio/romantic-background.mp3",
    title: "Romantic Melody for Abirami",
    artist: "With Love"
  },

  // Page 1: Welcome Surprise
  welcome: {
    greeting: "Hey Abirami… 💗",
    subtext: "Someone made something special just for you.",
    envelopeLabel: "For You, Abirami",
    buttonText: "Open Your Birthday Surprise ✨",
    typewriterIntro: "Every heartbeat today is celebrating you... Let's begin a journey through your special day."
  },

  // Page 2: Countdown
  countdown: {
    heading: "The Countdown to Your Special Day",
    subtext: "Every second is a little reminder of how special you are.",
    celebrateTodayHeading: "✨ It's Your Birthday Today! ✨",
    celebrateTodaySubtext: "Today the world is brighter because you are in it, Abirami!",
    nextButtonText: "Let's Celebrate 🎉"
  },

  // Page 3: Cake & Celebration
  celebration: {
    heading: "Happy Birthday, Abirami!",
    subheading: "You deserve all the happiness this world has to offer.",
    cakeInstruction: "Tap the candles or click below to make a wish!",
    makeWishButton: "Make a Wish ✨",
    blowCandlesText: "Blow Out the Candles 🎂",
    wishRevealedMessage: "May all your little dreams come true, Abirami. Keep smiling, always. 💖",
    sincereNote: "May this year surround you with warmth, laughter, quiet moments of peace, and everything that makes your heart flutter.",
    nextButtonText: "See Our Little Memories 📸"
  },

  // Page 4: Memories Scrapbook Gallery
  memories: {
    heading: "Little Moments, Beautiful Memories",
    subheading: "Some moments are small, but they stay in our hearts forever.",
    nextButtonText: "Read A Letter From My Heart 💌✨",
    // Replace placeholder image paths with your real pictures in public/images/
    // Supported formats: .webp, .jpg, .png, .jpeg
    photos: [
      {
        id: "mem-1",
        src: "/images/abirami-01.png",
        title: "Gentle Giant Friend 🐘",
        date: "Sweet Nature Memories",
        caption: "A joyful moment hugging an adorable baby elephant in a peaceful floral grove.",
        rotation: -3,
        tag: "Gentle & Kind"
      },
      {
        id: "mem-2",
        src: "/images/abirami-02.png",
        title: "Magical Hogwarts Dreams ⚡",
        date: "In the Wizarding World",
        caption: "With round glasses, wizard robes, and a wand casting magical golden sparks.",
        rotation: 2.5,
        tag: "Harry Potter"
      },
      {
        id: "mem-3",
        src: "/images/our-memory-01.png",
        title: "Watching the Glowing Moon 🌙",
        date: "Under the Midnight Sky",
        caption: "Peacefully gazing at the luminous crescent moon and twinkling pastel stars.",
        rotation: -2,
        tag: "Moonlit Dreams"
      },
      {
        id: "mem-4",
        src: "/images/our-memory-02.png",
        title: "Mommy & Daddy's Love 👨‍👩‍👧",
        date: "Family Warmth",
        caption: "Surrounded by the warmest hugs, guidance, and endless love of parents.",
        rotation: 3,
        tag: "Family Forever"
      },
      {
        id: "mem-5",
        src: "/images/our-memory-03.png",
        title: "Three Sisters Bond 👭💕",
        date: "Sisterhood Forever",
        caption: "With my loving older big sister and sweet younger sister, laughing together always.",
        rotation: -1.5,
        tag: "Sister Love"
      },
      {
        id: "mem-6",
        src: "/images/our-memory-04.png",
        title: "Birthday Squad Party! 🥳🎉",
        date: "Celebration Time",
        caption: "Party time with my favorite 3 girl-besties and 3 boy-besties cheering together!",
        rotation: 2,
        tag: "Squad Party"
      }
    ]
  },

  // Page 4: Love Letter
  letter: {
    heading: "A Letter From My Heart",
    subheading: "Penned with love, sealed with affection.",
    openButtonText: "Open My Letter 💌",
    salutation: "Dear Abirami,",
    body: `Happy Birthday to someone who makes the world feel a little more beautiful. Today is all about you — your smile, your happiness, your dreams, and all the wonderful things that make you special.

I hope this new year of your life brings you endless reasons to smile, beautiful memories to cherish, and the courage to follow every dream in your heart.

If this little website makes you smile even once, then it has already done what I hoped it would do.

You deserve happiness, today and always.`,
    closing: "With lots of love,",
    signature: "Always Your Gowtham ❤️",
    nextButtonText: "There's One More Thing… 💗"
  },

  // Page 6: The Final Surprise Proposal
  proposal: {
    heading: "Abirami, You're So Special to Me… 💖",
    subheading: "And there's one question I've been wanting to ask you…",
    question: "Will You Marry Me? 💍",
    yesButtonText: "YES 💖",
    noButtonText: "NO 🙈",
    celebration: {
      title: "You just made this moment even more special. 💖",
      message: "Abirami, here's to love, laughter, beautiful memories, and a future filled with happiness. 💍✨",
      foreverBadge: "Forever Starts With a Smile ❤️",
      replayButtonText: "Replay Our Little Love Story 💕"
    }
  }
};
