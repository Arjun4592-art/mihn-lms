# MIHN Certificate Verification — Firebase Setup

This connects the `/verify` page and the `/admin` panel to a real Firebase
backend (Firestore for data, Firebase Authentication for admin login).

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com → **Add project** → name it
   (e.g. `mihn-certificates`) → finish the wizard.
2. In the left sidebar: **Build → Firestore Database → Create database** →
   start in **production mode** → pick a region close to your users.

## 2. Enable admin login

1. **Build → Authentication → Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Go to the **Users** tab → **Add user** → create an account for each staff
   member who should manage certificates (e.g. `admin@mihn.edu.in` + a
   password). This is the login they'll use at `/admin`.

## 3. Get server credentials (Admin SDK)

1. **Project Settings** (gear icon) → **Service accounts**.
2. Click **Generate new private key** → confirm → a JSON file downloads.
3. Open that file and copy three fields into your `.env.local`
   (copy `.env.example` to `.env.local` first):
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep it in quotes, keep the
     `\n` sequences as-is)

   **Never commit this file or share it.** It grants full backend access.

## 4. Get the public client config (for admin sign-in only)

1. **Project Settings** → **General** tab → scroll to **Your apps** →
   click the **Web** icon (`</>`) → register an app (nickname anything,
   no need for hosting).
2. Copy the config values into `.env.local`:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

   These are safe to expose in the browser — they only identify the
   project. They're used solely to sign admin users in; certificate data
   never flows through the client SDK.

## 5. Set the admin allow-list

In `.env.local`, set:

```
ADMIN_EMAILS=admin@mihn.edu.in,records@mihn.edu.in
```

Only these emails (matched against the Firebase Auth accounts you created
in step 2) can use `/admin`, even if someone else signs up separately.

## 6. Lock down Firestore

Deploy `firestore.rules` (in the project root) so the database rejects any
direct request from a browser — all reads/writes go through this app's
server, using the Admin SDK, which bypasses these rules by design:

```
npm install -g firebase-tools   # if you don't have it
firebase login
firebase init firestore         # point it at this project, keep firestore.rules as-is
firebase deploy --only firestore:rules
```

(If you'd rather not install the CLI, you can paste the contents of
`firestore.rules` directly into **Firestore → Rules** in the console and
click **Publish**.)

## 7. Run it

```
npm install
npm run dev
```

- Visit `/verify` — the public certificate lookup page.
- Visit `/admin` — sign in with the account you created in step 2 to add,
  edit, revoke, or delete certificates, and to download a QR code for
  each one (encodes a link straight to that certificate's verify page).

## 8. (Optional) Load example data

To quickly see verified/expired states without typing anything in by hand:

```
npm run seed
```

This adds a few sample certificates, including one that's expired, so you
can test both states immediately. Feel free to delete them from `/admin`
afterwards.

## 9. Deploying

Any Next.js host works (Vercel, Firebase App Hosting, your own server).
Whichever you choose, set the same environment variables from
`.env.local` in that host's environment/secrets settings — the app reads
them the same way in production.

---

### Data model (for reference)

Firestore collection **`certificates`**, one document per Certificate ID:

| Field           | Example                                    | Notes                          |
|-----------------|---------------------------------------------|---------------------------------|
| `certificateId` | `EFC-000127`                                 | Also the document ID            |
| `studentId`     | `MIHN0001`                                   | **Internal only** — never sent to the public `/verify` page |
| `studentName`   | `Rahul Sharma`                               |                                  |
| `courseName`    | `Elite Fitness Coach Certification`          |                                  |
| `issueDate`     | `2026-08-12`                                  |                                  |
| `validUntil`    | `2027-08-12`                                  | Verified vs. Expired is computed by comparing this to today |
| `grade`         | `Distinction`                                |                                  |
| `issuedBy`      | `MIHN – Multiverse Institute of Health & Nutrition` |                            |
| `revoked`       | `false`                                       | Admin can flip this manually     |

One Student ID can have many certificate documents (one per course) — the
public verify page only ever returns the single certificate that was
searched for, never a student's other courses.
