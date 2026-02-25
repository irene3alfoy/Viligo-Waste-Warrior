import streamlit as st

st.set_page_config(
    page_title="Pantry Inventory App",
    page_icon="🥫",
    layout="centered"
)

# Title Section
st.title("🥫 Pantry Inventory App")
st.subheader("Smart Inventory Management with OCR & AI")

st.markdown("""
A smart Flutter application that manages pantry items using OCR and AI to reduce food waste and simplify kitchen management.
""")

st.divider()

# Features Section
st.header("🚀 Key Features")

features = [
    "🔐 Firebase Authentication",
    "📷 OCR Bill Scanning (Handwritten & Printed)",
    "📦 Inventory Management",
    "🤖 AI Recipe Suggestions",
    "⏰ Expiry Alerts",
    "🏆 Reward Points & Badges",
    "🥇 Leaderboard & Redeem System"
]

for feature in features:
    st.write(feature)

st.divider()

# Tech Stack Section
st.header("🛠 Tech Stack")

st.write("• Flutter")
st.write("• Firebase")
st.write("• Google ML Kit")
st.write("• Spoonacular API")

st.divider()

# Demo Simulation Section
st.header("🧪 Demo Simulation")

item_name = st.text_input("Enter Pantry Item")
expiry_days = st.slider("Days Until Expiry", 0, 30, 5)

if st.button("Check Item Status"):
    if item_name:
        if expiry_days <= 3:
            st.error(f"⚠️ {item_name} is expiring soon! Use it quickly.")
        else:
            st.success(f"✅ {item_name} is fresh. You're good to go!")
    else:
        st.warning("Please enter an item name.")

st.divider()

st.header("👩‍💻 Author")
st.write("Pratheeksha Shalbin")
