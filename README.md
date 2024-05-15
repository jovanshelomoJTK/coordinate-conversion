# Coordinate Conversion

## Description

Aplikasi sederhana untuk konversi DMS (Degree, Minute, Second) ke DD (Decimal Degree) dan sebaliknya dengan menggunakan Map Openlayer.

## Struktur Folder

```
coordinate-conversion/
├── __tests__/
│   └── ...
├── public/
│   └── ...
├── src/
│   ├── components/
│   │   ├── custom/
│   │   │   ├── converter-popup/
│   │   │   │   ├── dd2dms.tsx
│   │   │   │   ├── dms2dd.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── floating-button/
│   │   │   │   └── index.tsx
│   │   │   └── map-view/
│   │   │       └── index.tsx
│   │   └── ui/
│   │       └── ...
│   ├── hooks/
│   │   ├── useConverterPopoverStore.ts
│   │   └── useMapStore.ts
│   ├── lib/
│   │   ├── map-utils.ts
│   │   └── utils.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── jest.config.js
├── jest.setup.ts
├── package-lock.json
├── package.json
├── postcss.config.js
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
