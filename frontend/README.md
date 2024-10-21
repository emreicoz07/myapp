# Todo App Frontend

This is the frontend of the Todo App built using React and TypeScript. The project follows clean code principles with ESLint and Prettier, and uses Redux for state management.

---

Bu, React ve TypeScript kullanılarak yapılmış Todo App'in frontend kısmıdır. Proje, ESLint ve Prettier ile temiz kod prensiplerini takip eder ve state yönetimi için Redux kullanır.

## Requirements / Gereksinimler

- Node.js v14+ or higher / Node.js v14+ veya üstü
- Backend server (check the backend section of the project) / Backend sunucusu (projenin backend bölümüne bakın)

## Setup Instructions / Kurulum Talimatları

### 1. Clone the repository / Depoyu klonlayın

```bash
git clone <repository-url>
```

### 2. Install dependencies / Bağımlılıkları yükleyin

```bash
cd frontend
npm install
```

### 3. Run the development server / Geliştirme sunucusunu çalıştırın

```bash
npm start
```

This command will start the frontend React app on `http://localhost:3000`.

Bu komut, frontend React uygulamasını `http://localhost:3000` adresinde çalıştıracaktır.

### 4. Running Linting and Formatting / Lint ve Formatlama işlemleri

To run ESLint for linting and Prettier for formatting, use the following commands:

ESLint'i lint işlemi için ve Prettier'ı formatlama için çalıştırmak için aşağıdaki komutları kullanın:

```bash
# Run ESLint
npx eslint .

# Run Prettier
npx prettier --write .
```

These commands will ensure that the code follows the clean code guidelines defined by the project's ESLint and Prettier configurations.

Bu komutlar, projenin ESLint ve Prettier yapılandırmalarında tanımlanan temiz kod kurallarına uygun olup olmadığını kontrol eder.

## Project Structure / Proje Yapısı

```
frontend/
│
├── public/             # Static files / Statik dosyalar
├── src/                # Source files / Kaynak dosyalar
│   ├── assets/         # CSS, images, etc. / CSS, resimler, vb.
│   ├── components/     # React components / React bileşenleri
│   ├── redux/          # Redux store and slices / Redux store ve slice'lar
│   ├── services/       # API services (Axios) / API servisleri (Axios)
│   ├── App.tsx         # Main App component / Ana App bileşeni
│   └── index.tsx       # Entry point / Giriş noktası
├── .eslintrc.json      # ESLint configuration / ESLint yapılandırması
├── .prettierrc         # Prettier configuration / Prettier yapılandırması
├── package.json        # Project dependencies and scripts / Proje bağımlılıkları ve komutları
└── tsconfig.json       # TypeScript configuration / TypeScript yapılandırması
```

### Key Points / Önemli Noktalar:

- **Redux Store** is used for state management, and the store is defined in `src/redux/store.ts`.

  Redux Store, state yönetimi için kullanılır ve store `src/redux/store.ts` dosyasında tanımlanmıştır.

- **Axios** is used to interact with the backend API, and it is configured in `src/services/api.ts`.

  Backend API ile etkileşim kurmak için Axios kullanılır ve bu, `src/services/api.ts` dosyasında yapılandırılmıştır.

---

This project is part of the Todo App full-stack development. The frontend handles the UI and interacts with the backend to manage todo tasks.

---

Bu proje, Todo App tam yığın geliştirmesinin bir parçasıdır. Frontend, kullanıcı arayüzünü işler ve todo görevlerini yönetmek için backend ile etkileşim kurar.


ESLINT VE PRETTIER ICIN GEREKLI KODLAR 

{
  "env": {
    "node": true,
    "es2020": true,
    "browser": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "airbnb-typescript/base", // TypeScript için airbnb-base'i genişlet
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
    "project": "./tsconfig.json" // TypeScript için proje kökünü belirtiyoruz
  },
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "no-console": "off",
    "no-unused-vars": "warn",
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "import/extensions": "off", // Uzantılar genellikle TS ile kontrol edilir
    "linebreak-style": ["error", "unix"],
    "import/no-extraneous-dependencies": "error",
    "arrow-parens": ["error", "always"],

    // TypeScript ve React uyumluluğunu arttıran ek kurallar
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "argsIgnorePattern": "^_" }
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "class-methods-use-this": "off",
    "no-use-before-define": "off",
    "no-shadow": "off",
    "import/prefer-default-export": "off", // Default export yerine named export kullanımı teşvik edilir
    "import/order": [
      "error",
      { "alphabetize": { "order": "asc", "caseInsensitive": true } }
    ]
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}
