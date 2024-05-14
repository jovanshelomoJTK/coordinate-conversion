# Coordinate Conversion

## Description

Aplikasi sederhana untuk konversi DMS (Degree, Minute, Second) ke DD (Decimal Degree) dan sebaliknya dengan menggunakan Map Openlayer.

## Struktur Folder

```
coordinate-conversion/
├── public/
│   └── ...
├── src/
│   ├── components/
│   │   ├── custom/ (Custom component yang dibuat sendiri)
│   │   │   ├── converter-popup/
│   │   │   │   ├── dd2dms.tsx
│   │   │   │   ├── dms2dd.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── floating-button/
│   │   │   │   └── index.tsx
│   │   │   └── map-view/
│   │   │       └── index.tsx
│   │   └── ui/ (Reusable UI Component dari Shadcn/UI)
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       └── tabs.tsx
│   ├── lib/ (Folder untuk menyimpan utility)
│   │   └── utils.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tests (Folder untuk menyimpan test)
├── index.html
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## How to Run

1. Clone repository ini
2. Jalankan perintah berikut

   ```bash
   npm install
   npm run dev
   ```

3. Buka browser dan akses `http://localhost:5173/`
