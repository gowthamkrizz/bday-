# A Magical Birthday Surprise for Abirami 💖

A dreamy, aesthetic, romantic, and interactive multi-page birthday surprise web application created especially for **Abirami**.

Designed with a cute pastel aesthetic, glowing heart particles, interactive elements, a full-screen photo memory scrapbook, an intimate love letter, and a playful romantic proposal with an elusive escaping "NO" button and full-screen confetti celebration on "YES".

---

## ✨ Features Across the 6 Pages

1. **💌 Page 1: Welcome Surprise (`/`)**
   - Floating wax-sealed envelope with interactive opening animation.
   - Typewriter introduction and sweet welcoming atmosphere.
   - Gentle floating heart particles and music toggle.

2. **🎂 Page 2: Birthday Countdown (`/countdown`)**
   - Live animated countdown (Days, Hours, Minutes, Seconds).
   - Accurately counts down to Abirami's birthday configured in `src/config.js`.
   - Special *"It's Your Birthday Today!"* banner automatically triggers if today is her birthday.
   - Automatically handles future and past dates without showing negative numbers.

3. **🎉 Page 3: Birthday Celebration (`/celebration`)**
   - Cute 3D layered birthday cake with glowing, flickering candle flames.
   - Interactive **"Make a Wish ✨"**: blows out candles with realistic smoke animation, plays a magical chime, and unleashes a shower of heart-shaped confetti and sparkles.
   - Reveals an affectionate birthday wish: *"May all your little dreams come true, Abirami. Keep smiling, always. 💖"*
   - Can be relit and wished upon repeatedly.

4. **📸 Page 4: Our Little Memories (`/memories`)**
   - Polaroid-style photo cards with washi tape decorations, organic tilt angles, and soft drop shadows.
   - Staggered entrance animation using GSAP.
   - Full-screen interactive lightbox with zoom transitions, previous/next buttons, and keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
   - Tasteful illustration placeholders that never show broken image icons.

5. **💌 Page 5: A Letter From My Heart (`/letter`)**
   - Ivory parchment letter texture with delicate rose-pink borders and heart seal.
   - Interactive envelope opening with a realistic typewriter text reveal.
   - Skip typewriter animation by clicking anywhere on the letter.

6. **💍 Page 6: The Final Surprise — Will You Marry Me? (`/proposal`)**
   - Animated sparkling diamond engagement ring in gold and brilliant blue-white.
   - **Playfully Escaping NO Button**: Uses GSAP physics to playfully dart away whenever the pointer or finger approaches, staying safely within the viewport without covering the question or YES button.
   - **YES Button Celebration**: Full-screen romantic celebration with heart-shaped confetti, sparkling showers, chime sound effects, and the loving declaration: *"Forever Starts With a Smile ❤️"*.
   - **Replay Flow**: Cleanly restarts the love story from Page 1.

7. **🎵 Global Romantic Music Player**
   - Floating music control in the top-right corner across all pages.
   - Plays `/audio/romantic-background.mp3` if provided.
   - **Built-in Procedural Romantic Synthesizer**: If no audio file is provided yet, it automatically plays a dreamy ambient acoustic chime melody using the Web Audio API without throwing errors or remaining silent!

---

## 🛠️ Personalization Guide (All in `src/config.js`)

You can customize the entire experience by editing just one file: **[`src/config.js`](file:///c:/Users/acer/Desktop/bday/src/config.js)**:

- **Recipient Name & Nickname**:
  ```js
  recipientName: "Abirami",
  nickname: "Abi",
  ```
- **Birthday Date & Time**:
  ```js
  birthdayDate: "2026-10-25T00:00:00", // Format: YYYY-MM-DDTHH:mm:ss
  ```
- **Replacing Memory Photographs**:
  Place your `.webp`, `.jpg`, or `.png` photos into `public/images/`:
  - `public/images/abirami-01.webp`
  - `public/images/abirami-02.webp`
  - `public/images/our-memory-01.webp`
  - `public/images/our-memory-02.webp`
  - `public/images/our-memory-03.webp`
  - `public/images/our-memory-04.webp`
  *(You can also add or remove photos easily in `config.memories.photos`)*
- **Customizing the Love Letter**:
  Modify `config.letter.body` with your own heartfelt words.
- **Custom Background Music**:
  Place your favorite romantic MP3 file in `public/audio/romantic-background.mp3`.

---

## 🚀 How to Run Locally

### 1. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```
The optimized production build will be generated in the `dist/` directory.

### 3. Preview Production Build
```bash
npm run preview
```
