# Dark Patterns Research Website

A dummy e-commerce website created for research purposes to study and understand dark patterns in online shopping platforms. This website is inspired by quick commerce sites like Amazon, Flipkart, Zepto, and Blinkit.

## ⚠️ Disclaimer

This is a **research project** designed to demonstrate and study dark patterns in e-commerce. All products, prices, and transactions are fake. The dark patterns implemented here are for educational and research purposes only.

## 🎯 Research Focus: Implemented Dark Patterns

### 1. **False Urgency** ⏰
- Fake countdown timers that reset when they reach zero
- "Limited time offer" banners that are always active
- Persistent urgent messages throughout the site
- "Only X minutes left" notifications

### 2. **Scarcity** 📦
- Fake low stock indicators ("Only 2 left!")
- Artificial scarcity messages
- "High demand" warnings
- Stock level badges on products

### 3. **Misdirection** 🎯
- Pre-checked checkboxes for:
  - Newsletter subscriptions
  - SMS notifications
  - Premium memberships
  - Extended warranties
  - Gift wrapping
  - Express shipping
- Visual emphasis on non-essential add-ons
- Secondary opt-ins hidden in forms

### 4. **Basket Sneaking** 🛒
- Random products automatically added to cart
- 30% chance of sneaking items when users add products
- Sneaked items marked subtly as "Recommended"
- Delayed addition (2 seconds) to make it less obvious

### 5. **Confirmshaming / Donation Shaming** 😢
- Guilt-inducing language for declining donations
- "No, I don't want to help children get educated"
- Moral manipulation and emotional pressure
- Asymmetric positive/negative framing

### 6. **Shame-Based Manipulation (Packing)** 🌍
- Environmental shaming for requesting extra protection
- "SHAME: You're choosing to harm the environment"
- Warning labels on reasonable requests
- Guilt-based packaging selection

### 7. **Roach Motel / Iliad Flow (Cancellation)** 🐛
- Exhaustive 8-step cancellation process
- Multiple forms, surveys, and legal agreements
- 4 separate CAPTCHAs to verify identity
- Retention offers at every stage
- Inspired by Amazon's cancellation flow
- Makes leaving as difficult as possible

## 🚀 Features

- **User Authentication**: Mock login/logout system
- **Product Catalog**: 40 unique obscure, non-brand products
- **Product Pages**: Detailed pages with descriptions and images
- **Shopping Cart**: Full cart functionality with quantity controls
- **Checkout Process**: Complete checkout flow with forms
- **Responsive Design**: Clean, modern UI that works on all devices
- **Fake Social Proof**: Simulated purchase notifications and viewer counts

## 📦 Products

The site features 40 obscure, non-branded products across categories:
- Kitchen & Cooking
- Arts & Crafts
- Home Decor
- Outdoor & Camping
- Wellness
- Office Supplies
- And more...

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Storage**: LocalStorage for cart and auth persistence

## 📁 Project Structure

```
dummy-website/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CountdownTimer.jsx
│   │   └── ScarcityBadge.jsx
│   ├── context/          # Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── data/             # Product data
│   │   └── products.js
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd dummy-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Design Features

- **Modern UI**: Clean, colorful design inspired by modern e-commerce sites
- **Smooth Animations**: Pulse effects, hover transitions, and slide-ins
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Visual Hierarchy**: Clear product cards, prominent CTAs, and intuitive navigation

## 🧪 Research Notes

## 📊 DPRI Experimental Contract

This project includes a fixed experimental contract for measuring the Dark Pattern Resistance Index (DPRI). The contract defines task order, decision boundaries, manipulative vs resistant outcomes, recovery validity, and coverage checks for each task.

- Ground truth contract: `EXPERIMENT_TASKS.md`
- Task sequence: T1–T6 in fixed order
- Decision elements are identified by stable IDs (e.g., `task1-buy-now`, `task5-continue`)

### Dark Pattern Observations

1. **False Urgency**: Timers reset automatically, creating constant pressure
2. **Scarcity**: Low stock warnings appear on most products regardless of actual availability
3. **Misdirection**: Multiple pre-checked options in forms, with the most expensive/intrusive options emphasized
4. **Basket Sneaking**: Items appear in cart without explicit user action, labeled innocuously as "Recommended"

### User Experience Impact

These patterns are designed to:
- Create artificial time pressure
- Manipulate decision-making
- Increase cart value through deceptive means
- Opt users into services they didn't explicitly choose

## 📝 Notes for Researchers

- All transactions are simulated (no real payment processing)
- User data is stored only in browser localStorage
- Products use placeholder images from Unsplash
- The site accepts any email/password combination for login
- Cart data persists across sessions via localStorage

## 🤝 Contributing

This is a research project. If you're using this for academic purposes, please:
- Cite this work appropriately
- Use ethically and for educational purposes only
- Do not deploy as a real e-commerce site

## 📄 License

This project is created for educational and research purposes only.

## 🔗 References

- Dark Patterns: Understanding deceptive design practices
- E-commerce UX best practices (and anti-patterns)
- Consumer protection in digital commerce

---

**Note**: This website demonstrates problematic design practices for research purposes. These patterns should **not** be used in real-world applications as they are unethical and often illegal in many jurisdictions.

