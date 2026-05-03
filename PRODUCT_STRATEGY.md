# Swiss TV Companion — Product Strategy

## Positioning

A privacy-friendly Swiss TV companion for people who want one clean place to start watching, without grey-market streams, tracking-heavy portals, or generic IPTV clutter.

This is **not** a Teleboy/Zattoo clone unless we later obtain licensing. The defensible angle is trust, curation, local/private control, and living-room UX.

## Customer promise

- Find Swiss TV fast.
- Watch legal public streams instantly where possible.
- Open official broadcaster sources when direct playback is not legally/technically clean.
- Keep personal streams/favorites locally without accounts or tracking.
- Understand what is playable, official-only, private, or provider-based.

## Product paths to test

### 1. Legal Swiss TV launcher — safest MVP

**Value:** Clean directory, fast PWA, Apple-TV style UX, local favorites, recent channels, official links.

**Risk:** Lower monetization ceiling, but easiest to ship and validate.

**Best next tests:**
- Publish landing/PWA.
- SEO pages for “Schweizer TV Sender online”.
- Track anonymous page-level metrics only if privacy-respecting analytics is added.

### 2. Personal TV dashboard — differentiated power-user path

**Value:** Users add their own legal HLS/IPTV links locally, import/export private list, organize favorites.

**Risk:** Must avoid becoming a piracy tool. Keep copy strict and never ship third-party grey playlists.

**Possible Pro features:**
- encrypted local vault export
- multi-device sync via user-owned file/Drive/WebDAV later
- custom collections
- keyboard/remote shortcuts
- backup restore

### 3. Licensed provider/affiliate guide — business path

**Value:** Help Swiss users decide between Teleboy, Zattoo, blue TV, Wilmaa, etc.

**Revenue options:**
- affiliate links if available
- comparison pages
- sponsored placement only if clearly labeled

**Risk:** Needs editorial quality and trust. Do not become a fake comparison farm.

### 4. True native licensed TV — long-term, expensive path

**Value:** Actual full channel playback/replay/recording.

**Requirements:** broadcaster/provider agreements, rights management, replay rights, recording storage, account system, payments, legal review.

**Verdict:** Not the first path. Too expensive before validation.

## Quality principles

- Human wording over generic AI marketing.
- Clear labels: “Direkt spielbar”, “Offizielle Quelle”, “Privat”.
- Large clickable cards for sofa/Apple TV usage.
- No fake claims about access.
- No ads, no tracking by default.
- Explain legal constraints transparently instead of hiding them.

## Immediate roadmap

1. Add PWA install polish and better metadata.
2. Add keyboard/remote navigation.
3. Add channel health-check metadata for direct HLS streams.
4. Expand verified legal Swiss/local streams.
5. Build landing page copy around privacy + Swiss-first curation.
6. Deploy to Cloudflare Pages.
7. Validate search demand and real usage before monetization.
