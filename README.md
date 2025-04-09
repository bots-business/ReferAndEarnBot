# bb_affiliate_bot - chat bot
It is repository for chat bot: [@bb_affiliate_bot](https://t.me/bb_affiliate_bot)

# Refer & Earn Demo Bot

This is a simple but powerful **demo bot** built using the Bots.Business platform.  
It includes **only the most important features** needed for a successful Refer & Earn system — nothing extra, no web app, no smart features — just what really matters.

The goal of this bot is to **demonstrate all core features** used in referral and affiliate campaigns.

It also uses `mclib` to check if users are members of required channels before giving rewards — just like in real referral bots.

This bot is **perfect for beginners** who want to learn how Refer & Earn bots work on Bots.Business.  
It's clean, focused, and ready for real use or learning.

> A complete reference for anyone who wants to build a referral bot — simple, powerful, and to the point.


## 🧑‍💻 User Interface Overview

This bot offers a clean and smooth user experience with a focus on **clarity**, **ease of use**, and a **premium interactive feel** — all using the Bots.Business platform.

### 🚀 Starting the Bot

When a user starts the bot using the `/start` command, the bot checks whether the user has joined all the **required channels or groups**:

- ✅ **If the user is a member of all required channels**:  
  They see a **welcome message** along with a clean inline button menu.

- ❌ **If the user hasn't joined all required channels**:  
  The bot sends a message listing the required channels to join.  
  The list is fully dynamic — admins can manage the channels from the **admin panel** without touching the code.

### 🔘 Main Menu Buttons

Once users pass the channel check, they are shown a menu with the following buttons:

- 📢 **Refer & Earn** – Get your unique invite link and track referrals.  
- 💬 **Help & Support** – Contact admin or read basic help info.  
- 💼 **Balance & Account** – View your current balance and invite stats.  
- 🎁 **Bonus** – Claim periodic bonus,   
- 🏦 **Set Wallet (Withdraw)** – Users can enter their withdrawal address or wallet.

### ✨ Premium Interaction

- Tapping any button **edits the current message** in place, creating a clean and modern app-like experience.
- This editing behavior helps keep the chat uncluttered and feels similar to how premium Telegram bots work.
- When a user sends a **command manually** (like `/bonus`), the bot replies with a **new message**, since message IDs aren’t available for editing in that case.

### 🔄 Referral Flow

- If a user starts the bot from a **referral link**, the bot tracks the inviter.
- Once the new user joins all required channels, the inviter receives a **referral bonus**, defined in the admin panel.
- Both users (inviter and invitee) receive confirmation messages about the referral status and bonuses.

### ⚙️ Membership Check Modes

- On `/start`, the bot checks user membership using **`MCL`** (Membership Checker Lib).
- There is also a **background check option**:  
  If enabled from the admin panel, the bot will check membership on **every command** automatically.  
  > Note: This will deduct additional iterations from the admin’s Bots.Business account.

![bot welcome message](https://i.ibb.co/VcpnLGnJ/Screenshot-2025-04-09-16-08-48-359-org-telegram-messenger-web-edit.jpg)



This interface is designed to be clear and beginner-friendly, while still delivering a powerful and professional experience — exactly what a Refer & Earn bot needs.
---

## 🔗 Referral Link Generation

The bot includes a well-structured referral system that demonstrates how referral-based growth can be implemented cleanly within Bots.Business.

When the user clicks the `📢 Refer & Earn` button, the bot edits the current message (to maintain a clean interface) and displays:

- A customizable **referral preview image** (set via the admin panel)
- The user’s **unique referral link**, auto-generated using their Telegram ID
- The **total number of invites** they've attracted
- The **bonus per invite** and the **reward currency**

All of the above values — including the referral link prefix, bonus amount, and currency — are fully dynamic and can be managed in real-time from the **admin panel**, allowing admins to update reward logic without code changes. Default values are in place to ensure smooth operation out of the box.

![Referral Link pae](https://i.ibb.co/6V5VCzW/Screenshot-2025-04-09-16-29-45-885-org-telegram-messenger-web-edit.jpg)

### 🧩 Interactive Inline Buttons

- **My Invites**  
  Shows a list of users invited by the current user, the **total invite count**, and the **timestamp of the first invite**. This functionality uses the `referral-lib` for accurate tracking.

- **Top List**  
  Displays a **leaderboard** of top inviters, showing each user’s invite count. This provides a competitive incentive and transparency within the referral ecosystem.

- **Copy Link**  
  Utilizes the latest Telegram Bot API to offer a `copy_text` button, improving user convenience for sharing.

- **Back**  
  Smoothly navigates back to the previous message by editing it — enhancing the premium, app-like experience.

This section showcases how a referral system can be fully implemented with dynamic configuration, clean message management, and modular control — ideal for both real-world use and educational purposes for developers learning referral systems on the Bots.Business platform.


