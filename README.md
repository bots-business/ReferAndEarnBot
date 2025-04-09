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

---

This interface is designed to be clear and beginner-friendly, while still delivering a powerful and professional experience — exactly what a Refer & Earn bot needs.

