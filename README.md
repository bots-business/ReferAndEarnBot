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

## Table of contents:

- [User Interface](d#-user-interface-overview) (Rule 4.2, 2.7)
- [Referral Flow](#-referral-flow) (Rule 2.4)
- [Membership checker mode](#%EF%B8%8F-membership-check-modes) (Rule 2.1)
- [Referral Link generation](#-referral-link-generation) (Rule 2.4, 2.7)
- [Help & Support](#-help--support) (Rule 2.8)
- [Balance & Account](#-balance--account) (Rule 2.2)
- [Transaction history](#transaction-history) (Part of 2.2)
- [Periodic bonus](#-periodic-bonus) (Rule 2.5)
- [Set wallet](#-set-wallet) (part of Rule 2.3)
- [Broadcasting](#broadcasting) (Rule 3.4)
- [Withdraw system](#-withdraw-system) (Rules - 2.3, 3.3)
- [Ban & Unban](#ban--unban) (Rule 3.1) 
- [admin panel & Flexibality](#%EF%B8%8F-admin-panel--flexibality)  (Rules - 3.2, 3.5, 4.3)

## 🧑‍💻 User Interface Overview

This bot offers a clean and smooth user experience with a focus on **clarity**, **ease of use**, and a **premium interactive feel** — all using the Bots.Business platform.

### 🚀 Starting the Bot

When a user starts the bot using the `/start` command, the bot checks whether the user has joined all the **required channels or groups**:

- ✅ **If the user is a member of all required channels**:  
  They see a **welcome message** along with a clean inline button menu.

- ❌ **If the user hasn't joined all required channels**:  
  The bot sends a message listing the required channels to join.  
  The list is fully dynamic — admins can manage the channels from the **admin panel** without touching the code.

  Acording to the rule 2.7, the bot shows total users at the starting page, other statics like toplist and referral performance are placed on "referral" link page,

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

---

## 🛠 Help & Support

When the user clicks the **Help & Support** button, the bot smoothly **edits the current message** to display a clean and customizable "About the Bot" section. This section isn't hardcoded — it can be fully updated at any time directly from the admin panel, without needing to touch the source code. This makes it ideal for dynamic projects.
We have tow inline button `Ask a question` & `Back`for visiting last page.

Clicking **Ask Question** prompts the user to explain their issue. The bot accepts **any type of message** — text, photos, videos, stickers, voice, etc. Whatever the user sends next is treated as their support request.

Behind the scenes, the message is **Copied to the first admin** configured in the admin panel. The admin receives it with two inline buttons:
- `✅ Reply`
- `❌ Ignore`

If **Ignore** is selected, the user is not notified, and the request is silently dismissed (a clean way to handle spam or non-issues).  
If **Reply** is selected, the bot prompts the admin to send a reply in **any format** (text, photo, video, etc.), maintaining the same freedom of communication. The reply is then delivered to the user along with an `Ask Again` button so they can continue the conversation if needed.

This minimal but complete support workflow gives both user and admin a premium experience — fast, controlled, and efficient — and demonstrates how even complex interactions can be implemented cleanly using Bots.Business. It's a great reference for developers learning to build support flows, thanks to its clear structure, practical use of media handling, and user/admin feedback loop.

>🖼️ **Previews**

 ![Help & Support Screenshot](https://i.ibb.co/FbxdXppG/Screenshot-2025-04-09-17-16-03-119-org-telegram-messenger-web-edit.jpg)

![Ask a question](https://i.ibb.co/RpHL6M5W/YWIl-Hb1j-Fg-Tu.jpg)


admin replying


![admis replying](https://i.ibb.co/1JTvWfjk/qzbax-JRm7-Ar-C.jpg)

![Admin reply](https://i.ibb.co/pvKGfMfx/1-U7-ZQCQp-Jz-JM.jpg)


---

## 💼 Balance & Account

Clicking the **Balance & Account** button triggers a smooth in-place message edit (inline UX) that gives the user a clear summary of their referral profile. If the user runs the `/balance` command directly (without a message ID), the bot smartly sends a new standalone message — maintaining a polished experience in both contexts.

The account overview includes:

- **User ID**: Telegram numeric ID  
- **Name**: Display name from Telegram  
- **Username**: Telegram @username (if available)  
- **Invited By**: The user who referred them (shows `None` if user joined directly)
- **Referral Link**: User's unique invite link  
- **Balance**: Total earned via referrals
- **Wallet Address**: Set by the user for withdrawals (`Not Set` if they haven’t added it yet)

Inline buttons included:
- `🔗 Copy Referral Link` — copies the link using the latest Telegram API support for clipboard interaction
- `Withdraw` — Request for an withdraw.
- `Trabsaction history` - 15 most recent withdraw history
- `🔙 Back` — returns to the previous interface

This section gives users complete visibility into their invite stats and wallet setup without clutter or confusion.

---

# Transaction History

Users can view their 15 most recent withdrawal transactions by:

1. Sending the `/history` command.  
2. Clicking the **Transaction History** button on the **Balance & Account** page.

The history displays:
- **Amount** withdrawn
- **Wallet** details
- **Date** of transaction
- **Status** (e.g., completed, pending)

![image of history](https://i.ibb.co/Ps6sHYcx/o-Dh1-RSzug-ZUu.jpg)

_Tested_
---

## 🎁 Periodic Bonus

The **Bonus** button gives users the option to claim a periodic reward — a simple yet effective way to boost user engagement in your referral bot.

When the user taps the button, the bot checks if the configured time interval since their last claim has passed. If eligible, the specified bonus amount is instantly credited to their balance. If not, they’re informed how much time is left before they can claim again.

This is not limited to a daily bonus — the **claim period** and **bonus amount** are fully customizable via the **Admin Panel**. Whether it's every 1 hour, 6 hours, or 24 hours, the bot is built to adapt without any code changes.

This flexible, no-frills implementation makes it ideal for showcasing real-world reward logic while keeping things simple and highly configurable for developers and admins alike.

![Bonus claim](https://i.ibb.co/MxsyX10h/Screenshot-2025-04-10-10-01-48-910-org-telegram-messenger-web-edit.jpg)
---

## 💼 Set Wallet
Upon clicking the **Set Wallet** button, users are prompted to send the `/setwallet` command followed by their wallet address. The bot guides them with a clear usage format:

/setwallet TX8D1vExampleWalletAddress

- 💡 **Default Wallet Type**: `TRX (TRC20)`
- ⚙️ **Fully Configurable**: The currency type and wallet requirement can be adjusted from the **Admin Panel**, making the system adaptable for USDT, BNB, or any token of your choice.
- 🔐 **Wallet Usage**: The saved wallet is linked to the user's account and is used when processing withdrawals.
- 🔁 **Change Anytime**: Users can update their wallet simply by sending the command again with a new address.

This implementation is designed to be simple, secure, and highly flexible — ideal for developers learning how to build production-ready referral bots on the Bots.Business platform.

![Setting wallet](https://i.ibb.co/Zz8NMGLT/Screenshot-2025-04-10-10-05-22-095-org-telegram-messenger-web-edit.jpg)

---

## 💸 Withdraw System

Users can withdraw their earnings by clicking the **Withdraw** button or sending `/withdraw <amount>`. The bot provides usage examples and enforces min/max limits, all configurable via the admin panel.

Once a valid request is made:
- Amount is instantly deducted from the user's balance.
- Admins receive a detailed notification in the configured withdraw channel (name, amount, wallet, time).

Admins have two actions:
- ✅ **Amount Sent** – Marks as paid, notifies user, and posts to payout channel.
- ❌ **Declined** – Marks as rejected, notifies user, and updates payout channel.

After approval/rejection, the request message is edited to reflect the status, with a **Delete** button shown only to admins.

---

# Ban & Unban

Admins can manage user access using the following commands:

- **Ban**: `/ban <user_tgid>`  
  - Only admins can ban a user.  
  - Prevents the user from using the bot, stopping them before any command (denoted by `@`).  

- **Unban**: `/unban <user_tgid>`  
  - Only admins can unban a user.  
  - Restores the user's ability to use the bot fully.

Use the user's Telegram ID (`user_tgid`) to execute these commands at any time.

---


## ⚙️ Admin Panel & Flexibality

This table provides a full demonstration of how an **Admin Panel** can be integrated into a bot built on **Bots.Business (BB)**, offering **easy access to all dynamic settings** without needing to touch the bot's internal code. It showcases how developers can manage features, appearance, behavior, and logic directly through the interface.

| Setting Name                     | Title / Purpose                              | Description                                                                 |
|----------------------------------|----------------------------------------------|-----------------------------------------------------------------------------|
| ANNOUNCEMENT_CHANNEL             | 📢 Announcement Channel                      | Payout updates will be sent automatically to this channel.                 |
| WITHDRAW_NOTIFICATION_CHANNEL    | 🏦 Withdraw Notification Channel            | Withdrawal notifications are sent here for admin approval.                 |
| CURRENCY                         | 💱 Currency                                  | The currency used across the bot (e.g., TRX, USDT, BTC).                   |
| BONUS_REWARD                     | 🎁 Bonus Reward                              | The bonus amount a user receives per claim.                                |
| BONUS_INTERVAL                   | ⏱️ Bonus Interval                            | Time duration users must wait before claiming the next bonus.              |
| REFER_REWARD                     | 👥 Referral Reward                           | Amount credited to users per successful referral.                          |
| ADMINS                           | 👮 Admins                                    | Comma-separated list of Telegram user IDs with admin privileges.           |
| SUPPORT_MESSAGE                  | 🆘 Support Message                           | Markdown-formatted message shown when user clicks "Help & Support".        |
| START_MESSAGE                    | 🚀 Start Message                             | Initial message shown on /start command.                                   |
| ERROR_MESSAGE                    | ❌ Error Message                             | Message shown when an error occurs in the bot.                             |
| MINIMUM_WITHDRAW                 | 💸 Minimum Withdraw                          | Smallest amount users can request to withdraw.                             |
| MAXIMUM_WITHDRAW                 | 💰 Maximum Withdraw                          | Maximum limit for a single withdrawal.                                     |
| REFER_LINK_PREFIX                | 🔗 Referral Link Prefix                      | Base URL used for generating referral links.                               |
| REFER_IMAGE_URL                  | 🖼️ Referral Image URL                        | Image shown in the referral message preview.                               |
| BACKGROUND_MEMBERSHIP_CHECKUP   | ✅ Background Membership Checkup             | Toggle for enabling/disabling background membership verification.          |

> 💡 **This table reflects how powerful and developer-friendly Bots.Business can be** when it comes to building scalable and configurable Telegram bots — especially for features like Refer & Earn, Bonus Rewards, and Withdraw Systems.

---

# Broadcasting

The broadcasting feature allows admins to send messages of any type to all users securely using the powerful BB method: `Bot.runAll`. This feature is exclusive to admins for enhanced security.

## How It Works

 - An admin sends any type of message to the bot (e.g., text, image, GIF, sticker, or manually formatted text).
 - Reply to the sent message with the `/broadcast` command.  
 - The bot will copy and send the message to all users.

 **Benefits**  
   - Supports all message types, including manually formatted text, images, GIFs, stickers, and more.  
   - Ensures a seamless and flexible broadcasting experience.

4. **Broadcast Status**  
   - After initiating a broadcast, the admin receives an instant response with broadcast details.  
   - The broadcast ID is saved as the "last broadcast."  
   - To check the progress, the admin can run `/broadcast_status` to view the status and completion progress of the broadcast.

![Broadcast Preview](https://i.ibb.co/SX56kPL7/7o-I1it-Th-Cqzi.jpg)  
*Example preview of a broadcast message being sent to users.*

---

## Setup Process
This section guides you through setting up the Telegram bot for optimal functionality. Follow these steps carefully to ensure the bot is configured correctly for the contest submission.


1. **Clone the Bot**  
   - Clone the bot from the [GitHub repository](insert-repo-link) or download it from the BB Demo Bot Store (if available).

2. **Launch the Bot**  
   - Use your bot token to launch the bot.  
   - Run the `/setup` command to initialize the bot.  
     - This will:  
       - Set all required commands using `setMyCommands` (see the table below for the full list of commands).  
       - Configure the admin panel for further customization.  
       - Initialize MCLib for membership checking.

   **Commands Set During Setup**  
   The following commands are configured automatically via `setMyCommands`:

   | Command                | Description                              |
   |------------------------|------------------------------------------|
   | `/start`               | Start the bot                            |
   | `/withdraw`            | Withdraw your balance                    |
   | `/bonus`               | Claim your timely bonus                  |
   | `/help`                | Get support                              |
   | `/referral`            | Get your referral link and details       |
   | `/myreferrals`         | Get list of your invitees                |
   | `/toplist`             | Get top inviters                         |
   | `/balance`             | Get your balance and account info        |
   | `/setwallet`           | Setup your wallet                        |
   | `/sendbalance`         | For admins only                          |
   | `/broadcast`           | Send broadcast, for admins only          |
   | `/broadcast_status`    | For admins only, see broadcast status    |
   | `/ban`                 | Ban any user, (`/ban 123457`)            |
   | `/unban`               | Unban any user, (`/unban 1352464`)       |

4. **Configure the Admin Panel**  
   - Navigate to the **Admin Panel** section in your bot.  
   - You will see two panels. Open the **Membership Checker Options** panel.  
   - Fill in the following fields:  
     - **Channels Chat IDs**: Enter the chat IDs of required channels, separated by commas.  
     - Configure the membership checker commands as shown in the table below:

   | Field                     | Command            | Description                                                                 |
   |---------------------------|--------------------|-----------------------------------------------------------------------------|
   | `onNeedJoining`           | `/needJoinAll`     | Triggers if the user is not a member of any required channel.               |
   | `onJoining`               | `/justJoinedOne`   | Triggers when the user joins any of the required channels.                  |
   | `onAllJoining`            | `/joinedAll`       | Triggers when the user joins all required channels.                         |
   | `onError`                 | `/mclibError`      | Triggers on errors from MCLib.                                              |

5. **Additional Configurations**  
   - Configure the following in the admin panel:  
     - Admins list.  
     - Withdraw notification settings.  
     - Payout announcement channels.  
     - Other settings as needed.  
   - Refer to [this table](insert-link) for a complete list of modifications available in the admin panel.

> **Note**: Only the **first admin** listed in the admin panel will receive support messages from users.

By following these steps, your bot will be fully set up and ready for the production.

---

# Fully Ready for Demo

The bot is designed to be demo-ready out of the box, ensuring a smooth experience even without initial configuration. Below are the key features that make this possible:

- **Default Configurations**: All settings come with default values, eliminating errors if the bot is run without manual setup.  
- **Comprehensive Error Handling**:  
  - Every possible error scenario is covered with robust fallbacks.  
  - MCLib errors are handled via the `/mclibError` command.  
  - If the admin list is empty, the support system will inform user about this.  
  - If no admin channel is set for withdrawal requests, Bot will notify user stop withdraw functions.  
- **Extensive Fallbacks**: The bot anticipates and addresses nearly every edge case, ensuring seamless operation during demos.
