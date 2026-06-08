import { useState } from "react";

interface FoodItem {
  id: number;
  name: string;
  quantity: number;
  expiry: string;
}

function App() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expiry, setExpiry] = useState("");

  const addItem = () => {
    if (!name || !expiry) return;

    const newItem: FoodItem = {
      id: Date.now(),
      name,
      quantity,
      expiry
    };

    setItems([...items, newItem]);

    setName("");
    setQuantity(1);
    setExpiry("");
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px"
      }}
    >
      <h1>🌱 Viligo Waste Warrior</h1>

      <h2>Add Pantry Item</h2>

      <input
        type="text"
        placeholder="Food Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        value={quantity}
        onChange={(e) =>
          setQuantity(Number(e.target.value))
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addItem}>
        Add Item
      </button>

      <hr />

      <h2>Inventory</h2>

      {items.length === 0 ? (
        <p>No items added.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong>
              {" | "}
              Qty: {item.quantity}
              {" | "}
              Expiry: {item.expiry}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
