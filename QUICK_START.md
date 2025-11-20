# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: `http://localhost:5173`

---

## 📱 How to Use the Website

### First Time Setup

1. **Homepage**: You'll land on the homepage with fake deals and countdown timers
2. **Browse Products**: Click "Products" or "Shop Now" to see all 40 products
3. **Login/Register**: Click "Login" in the header
   - **Use any email/password combination** (e.g., test@test.com / password123)
   - Registration is also mock - any details work

### Testing the Features

#### 🛍️ Shopping Flow
1. Browse products on Products page or Homepage
2. Click any product to view details
3. Click "Add to Cart"
4. View cart by clicking cart icon in header
5. Proceed to Checkout
6. Fill out form (any fake data works)
7. Complete purchase

#### 🎯 Observing Dark Patterns

**False Urgency:**
- Watch the countdown timers on homepage, product pages, cart, and checkout
- Notice how they create pressure to buy quickly
- Timers will reset when they reach zero (refresh to see)

**Scarcity:**
- Look for "Only X left!" badges on products
- Red pulsing badges for very low stock
- Notice fake urgency in product descriptions

**Misdirection:**
- Login page: See pre-checked marketing options
- Cart page: Notice pre-checked shipping/warranty add-ons
- Checkout: Multiple pre-selected subscription options

**Basket Sneaking:**
- Add any product to cart
- Wait 2-3 seconds
- Check cart - sometimes an extra "Recommended" item appears
- This happens about 30% of the time

---

## 🎨 Key Pages to Explore

### 1. Homepage (`/`)
- Hero section with mega sale banner
- Flash sale section
- Featured products
- Fake purchase notifications (bottom-left corner)
- Multiple countdown timers

### 2. Products Page (`/products`)
- All 40 products with filters
- Category filtering
- Sort options
- Persistent urgency banner at top

### 3. Product Detail (`/product/:id`)
- Full product information
- Multiple dark patterns in one place
- Pre-checked protection plan
- Scarcity and urgency indicators
- Related products

### 4. Shopping Cart (`/cart`)
- View all cart items
- Adjust quantities
- See sneaked items (marked as "Recommended")
- Pre-checked add-ons in summary
- Countdown timer for reserved items

### 5. Checkout (`/checkout`)
- Full checkout form
- Multiple pre-checked marketing options
- Urgency timers
- Order summary with all charges

### 6. Login/Register (`/login`)
- Mock authentication (any credentials work)
- Pre-checked marketing preferences
- Toggle between login and registration

---

## 🧪 Testing Scenarios

### Scenario 1: Quick Purchase
1. Go to homepage
2. Click any product in Flash Sale
3. Add to cart immediately
4. Notice urgent messages
5. Check cart and proceed
6. Observe all the pre-checked options

### Scenario 2: Browsing Multiple Products
1. Go to Products page
2. Filter by category
3. Compare scarcity indicators
4. Add multiple items to cart
5. Wait for basket sneaking
6. Check cart for unexpected items

### Scenario 3: Account Creation
1. Click Login
2. Switch to "Sign up"
3. Notice all pre-checked boxes
4. Complete registration
5. Return to shopping

### Scenario 4: Full Checkout
1. Add products to cart
2. Go through entire checkout
3. Fill in fake information
4. Notice running timers
5. See all pre-checked options
6. Complete "purchase"

---

## 💻 Technical Details

### Port
- Default: `http://localhost:5173`
- Vite may use a different port if 5173 is busy

### Data Storage
- Cart: LocalStorage (`cart` key)
- User: LocalStorage (`user` key)
- Clear storage to reset: Open browser DevTools → Application → Local Storage → Clear

### No Backend Required
- All data is client-side
- No real payment processing
- No real user accounts
- Perfect for research and demos

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port already in use
- Vite will automatically try the next available port
- Or kill the process using port 5173
- Or specify a custom port: `npm run dev -- --port 3000`

### Cart not persisting
- Check browser localStorage is enabled
- Try clearing localStorage and starting fresh
- Make sure cookies/storage isn't blocked

### Dark patterns not visible
- Make sure you're on the correct pages
- Basket sneaking has only 30% trigger rate - try multiple times
- Refresh the page to see timers reset

---

## 📊 For Researchers

### Logging Dark Pattern Events

To track user interactions with dark patterns, you can:

1. **Open Browser DevTools** (F12)
2. **Console tab**: See any errors
3. **Application tab**: View LocalStorage data
4. **Network tab**: Monitor fake "requests"

### Cart Data Structure
```javascript
// LocalStorage: cart
[
  {
    id: 1,
    name: "Product Name",
    price: 89.99,
    quantity: 1,
    sneaked: true/false,  // Indicates basket sneaking
    sneakedAt: "2024-11-20T..." // Timestamp if sneaked
  }
]
```

### Modifying Dark Pattern Intensity

Edit these files to adjust:
- `src/context/CartContext.jsx` - Line ~50: Change `Math.random() < 0.3` to adjust basket sneaking probability
- `src/components/CountdownTimer.jsx` - Change `initialMinutes` prop to adjust timer duration
- `src/data/products.js` - Modify `stock` values to change scarcity indicators

---

## 🎓 Educational Use

### For Classes/Workshops
1. **Before**: Have participants shop without knowledge of dark patterns
2. **During**: Walk through each pattern type
3. **After**: Discuss observations and ethical implications

### Discussion Questions
- Which dark patterns did you notice?
- Which ones influenced your behavior?
- How did you feel when you discovered the manipulation?
- What regulations should exist to prevent these?
- How can designers create urgency ethically?

---

## 📝 Notes

- **All prices are fake** - No real transactions occur
- **All products are fictional** - Images from Unsplash
- **All timers are fake** - They reset endlessly
- **All stock levels are fake** - Randomly assigned
- **All social proof is fake** - Random generated notifications

---

## 🔗 Additional Resources

- **README.md** - Full project documentation
- **DARK_PATTERNS_GUIDE.md** - Detailed dark pattern explanations
- **src/** - Full source code for examination

---

## 🆘 Need Help?

### Common Issues

**Q: Login isn't working**
A: Use ANY email/password - authentication is mock

**Q: Checkout says "no items"**
A: Add items to cart first, then click checkout

**Q: I don't see basket sneaking**
A: It's random (30% chance). Try adding multiple products

**Q: Timers aren't counting down**
A: Refresh the page - they should start immediately

**Q: Can I modify the products?**
A: Yes! Edit `src/data/products.js`

---

**Ready to explore? Start the server and visit `http://localhost:5173`**

Happy researching! 🔍

