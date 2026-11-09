CRASH X - install as an app
===========================
Files
  index.html            the game
  manifest.webmanifest  app name, colours, icons (makes it installable)
  sw.js                 offline support (solo works with no internet)
  icons/                app icons (192, 512, maskable, Apple touch, favicon, SVG)
  firebase.json         optional: Firebase Hosting config

Installing needs the game to be served over HTTPS (opening the file directly
from storage works for playing, but the browser will not offer "Install").

Easiest way - Firebase Hosting (you already use Firebase):
  1. npm i -g firebase-tools
  2. firebase login
  3. in this folder:  firebase init hosting   (public dir ".", do NOT overwrite index.html)
  4. firebase deploy
  Any other static host works too (Netlify, GitHub Pages, Cloudflare Pages).

Then on the phone:
  Android / Chrome : open the site, tap "Install Crash X app" on the menu
                     (or browser menu > Install app).
  iPhone / Safari  : Share > Add to Home Screen.
  Desktop Chrome/Edge: install icon in the address bar.

Open the installed app once while online so it can save itself. After that
Solo vs bots works with no connection. Multiplayer needs internet.
