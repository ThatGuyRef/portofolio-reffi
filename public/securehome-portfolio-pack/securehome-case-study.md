# SecureHome — portfolio case study pack

Everything below is ready to paste. Images live in `assets/`.
Copy is written in English to match your CV; translate if your site is in Bahasa Indonesia.

---

## 1. Project card (for the projects grid)

**Title**
SecureHome — IoT Home Security System

**One-liner**
A Flutter app and two-board ESP32 system that guards a house with contactless cards,
door and motion sensors, and a camera — with three security modes so the alarm reacts
differently depending on whether anyone is home.

**Tags**
`Flutter` `Dart` `Supabase` `PostgreSQL` `REST API` `ESP32` `C++` `UI/UX` `Row Level Security`

**Card thumbnail**
`assets/cover-prototype.jpg`

**Links**
- Code: https://github.com/ThatGuyRef/SecureHome
- Case study: (your detail page)

---

## 2. Meta description (for SEO / link previews)

> SecureHome is an IoT home-security system I designed and built end to end: a Flutter
> monitoring app, a PostgreSQL backend secured with row-level access control, and ESP32
> firmware driving NFC authentication, door and motion sensors, and a camera.

---

## 3. Quick facts panel

| Field | Value |
|---|---|
| Role | Sole designer and developer |
| Timeline | 2025 – 2026 (undergraduate thesis) |
| Frontend | Flutter, Dart — Android and web builds |
| Backend | Supabase (PostgreSQL, Auth, Storage), REST over HTTPS |
| Firmware | ESP32 and ESP32-CAM, C++ / Arduino, PlatformIO |
| Scope | 19 screens, 6 database tables, 2 microcontroller boards |

---

## 4. The problem

Theft is the most reported crime in Indonesia, yet the usual answer at home is still a
mechanical lock: entirely passive, and silent when a door is forced. The IoT projects I
studied first mostly solved one slice each — motion plus camera, or card access, or a door
sensor — and nearly all of them pushed the response to a third-party chat notification. When
the internet drops, those systems have nothing left to say.

They also share a subtler flaw. A single operating mode treats every event identically, so a
resident walking to the kitchen at night raises the same alarm as an intruder. False alarms
train people to ignore the system.

---

## 5. What I built

SecureHome joins card authentication, door sensing, motion detection, visual evidence and a
local siren into one system whose behaviour changes with the mode in effect.

- **Disarmed** — the siren never sounds, but doors and cards are still logged, so the access
  trail is never lost.
- **Home** — doors and cards are fully guarded; motion sensing is switched off, because a
  resident moving around the house is not an anomaly.
- **Away** — everything is armed. A door opening, an unknown card or any movement latches the
  siren and triggers the camera.

The siren latches on purpose: it does not stop by itself and can only be cleared by tapping a
registered card on the reader or pressing stop in the app.

**Image:** `assets/diagram-architecture.png`
*Alt text: architecture diagram showing the main ESP32 board, the ESP32-CAM board, the Supabase
cloud service and the Flutter app, with the trigger line between the two boards.*

---

## 6. Design process — from wireframe to shipped UI

I designed the interface before writing a single widget: a navigation map first, so every
feature is reachable without memorising a path, then wireframes for each screen to settle the
order of importance before colour or type entered the picture.

The home screen puts the current mode at the very top, then device connectivity, then a
preview of the last captured image, then recent events — so the state of the house is legible
in one glance without opening anything.

**Image:** `assets/design-wireframe-vs-shipped.jpg`
*Alt text: four screens shown twice, wireframe next to the finished interface — home, security
mode, event log and camera.*

**Image:** `assets/diagram-navigation.png`
*Alt text: navigation map from the authentication gate through the four-tab shell to every
nested screen.*

---

## 7. Frontend highlights

- **Four-tab shell** — home, mode, event log and settings, with nested routes for camera,
  cards, card registration, profile and password change.
- **Live state without a socket** — views poll and refresh every five seconds while visible, so
  device status and new events appear without the user pulling to refresh.
- **Derived status instead of stored flags** — a device is shown as online when its last report
  is under ninety seconds old, rather than trusting a boolean the device would never get to
  update when it dies.
- **Cross-platform camera view** — the live MJPEG stream cannot be decoded by Flutter's normal
  image widget on the web, so the camera page swaps implementation per platform: an HTML
  element on web, a streaming widget on mobile.
- **Honest empty and offline states** — every screen has a designed state for "no device yet",
  "no cards yet" and "camera unreachable", instead of an endless spinner.

**Images:** `assets/app-beranda.png`, `assets/app-mode.png`, `assets/app-riwayat.png`,
`assets/app-kartu.png`, `assets/app-kamera.png`, `assets/app-setelan.png`
*Alt text pattern: SecureHome app — [home / security mode / event log / NFC cards / camera /
settings] screen.*

---

## 8. Backend and data

Every row in the database carries its owner, and access is enforced by PostgreSQL row-level
security rather than by hiding things in the interface. I proved it the only way that counts:
by attacking it from a second account.

| Test from another account | Result |
|---|---|
| Read tables with no session | Rejected |
| Sign in without a registered device | Empty — no data leaked |
| Load another owner's camera image | Rejected |
| Change another owner's security mode | Rejected |

Two design decisions worth calling out. Enrolment and streaming windows are stored as
*deadlines*, not booleans, so nothing has to write "I am finished" — a device that dies mid-way
simply lets the deadline lapse. And the card registry is cached on the device with a thirty
second refresh, a deliberate trade between working offline and revoking a card quickly.

---

## 9. Things that broke, and the fixes

Worth including — recruiters read this section closely.

- **The board rebooted every time the siren sounded.** Not a code bug: the buzzer's inrush
  current dragged the supply below the brownout threshold. Fixed by shortening the buzzer pulse
  and moving from a laptop USB port to a 2 A charger.
- **The card reader answered with an echo of my own command.** The SPI chip-select line was on
  the wrong pin, so the module never responded at all.
- **Image uploads were rejected by the storage policy.** The upsert flag made PostgreSQL
  evaluate the UPDATE policy as well as INSERT; the missing UPDATE policy surfaced as a
  confusing INSERT violation.
- **A deleted card still opened the door.** The five minute cache refresh was too slow; shortened
  to thirty seconds.
- **The enrolment window never closed.** The device cleared only its own local flag, so the app
  still believed enrolment was open. The device now closes the window itself.

---

## 10. What I would do next

Store card identifiers as a one-way hash instead of the raw value, pin a root certificate on the
microcontroller so the TLS connection is verified and not merely encrypted, and add an outbound
relay so the live camera view works outside the home network without opening a router port.

---

## 11. Suggested page order

1. Hero — title, one-liner, tags, cover image, link to the repository
2. Quick facts panel
3. The problem
4. What I built (+ architecture diagram)
5. Design process (+ wireframe vs shipped, navigation map)
6. Frontend highlights (+ app screenshots)
7. Backend and data (+ security test table)
8. Things that broke
9. What I would do next

---

## 12. Asset checklist

| File | Use |
|---|---|
| `cover-prototype.jpg` | card thumbnail and hero |
| `design-wireframe-vs-shipped.jpg` | design process — the single strongest image for a frontend role |
| `diagram-architecture.png` | what I built |
| `diagram-navigation.png` | design process |
| `diagram-usecase.png` | optional, for the problem or scope section |
| `app-login.png` | optional |
| `app-beranda.png` `app-mode.png` `app-riwayat.png` `app-kartu.png` `app-kamera.png` `app-setelan.png` `app-profil.png` | frontend highlights gallery |

All screenshots are 643 × 1400 with the emulator toolbar cropped out, ready to drop into a
phone-frame mockup or use as they are.
