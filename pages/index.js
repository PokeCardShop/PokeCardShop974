// Ajoute ce script PayPal dans le head de ton document HTML ou _document.js pour Next.js
// <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=EUR"></script>

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Mail, Home, Lock, Trash2, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const dummyProducts = [
  { id: 1, name: 'Carte Pikachu VMAX', price: 18.99, stock: 3 },
  { id: 2, name: 'Dracaufeu EX Rare', price: 29.99, stock: 0 },
  { id: 3, name: 'Booster Épée & Bouclier', price: 5.99, stock: 12 },
];

export default function HomePage() {
  const [showShop, setShowShop] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [products, setProducts] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('products') : null;
    return stored ? JSON.parse(stored) : dummyProducts;
  });
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', id: null });
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const handleAddToCart = (product) => {
    const sparkle = document.createElement('img');
    sparkle.src = 'https://upload.wikimedia.org/wikipedia/commons/3/39/Pokeball.png';
    sparkle.alt = 'Pokéball';
    sparkle.className = 'fixed w-12 h-12 animate-spin pointer-events-none z-50';
    sparkle.style.top = '50%';
    sparkle.style.left = '50%';
    sparkle.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const message = e.target.message.value;
    const mailtoLink = `mailto:PokeCardShop974@gmail.com?subject=Commande depuis le site&body=Nom: ${encodeURIComponent(name)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-100 text-gray-900 relative overflow-hidden">
      <header className="p-4 flex justify-between items-center bg-white shadow-md z-10 relative">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.2 }} 
          className="text-3xl font-bold text-yellow-600">
          PokeCards Shop
        </motion.h1>
        <nav className="space-x-4">
          <Button variant="ghost" onClick={() => { setShowShop(false); setShowAdmin(false); setShowContact(false); }}><Home className="inline mr-1" />Accueil</Button>
          <Button variant="ghost" onClick={() => { setShowShop(true); setShowAdmin(false); setShowContact(false); }}><ShoppingCart className="inline mr-1" />Boutique</Button>
          <Button variant="ghost" onClick={() => { setShowShop(false); setShowAdmin(false); setShowContact(true); }}><Mail className="inline mr-1" />Contact</Button>
          <Button variant="ghost" onClick={() => { setShowAdmin(true); setShowShop(false); setShowContact(false); }}><Lock className="inline mr-1" />Admin</Button>
        </nav>
      </header>

      {!showShop && !showAdmin && !showContact && (
        <section className="text-center mt-10">
          <h2 className="text-2xl font-bold mb-4">Bienvenue sur PokeCard Shop !</h2>
          <p className="text-gray-700">Découvrez nos cartes Pokémon, ajoutez-les au panier et commandez facilement.</p>
        </section>
      )}

      {showContact && (
        <section className="p-8 max-w-xl mx-auto bg-white mt-10 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">📞 Contact</h2>
          <p className="mb-4 text-center">Boutique spécialisée en cartes pokémon, commande possible si pas de stock !</p>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Nom</label>
              <input type="text" name="name" defaultValue="Alfano" className="w-full border px-4 py-2 rounded-md" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Message / Commande</label>
              <textarea name="message" rows="4" className="w-full border px-4 py-2 rounded-md" placeholder="Je souhaite commander..." required></textarea>
            </div>
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">Envoyer la commande</Button>
          </form>
          <div className="mt-6 text-center">
            <p>📧 Email : <a href="mailto:PokeCardShop974@gmail.com" className="text-blue-600">PokeCardShop974@gmail.com</a></p>
            <p>📱 Téléphone : <a href="tel:+262693828534" className="text-blue-600">0693 82 85 34</a></p>
          </div>
        </section>
      )}

      <footer className="mt-16 p-6 text-center text-sm text-white bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-t-xl shadow-inner relative overflow-hidden">
        <img src="https://www.pngmart.com/files/22/Master-Ball-PNG-Isolated-Image.png" alt="Master Ball" className="absolute opacity-10 w-40 h-40 bottom-2 right-4 rotate-12 pointer-events-none" />
        <p className="mb-1 relative z-10">🕹️ Boutique Pokémon 100% Réunion</p>
        <p className="relative z-10">📧 Email : <a href="mailto:PokeCardShop974@gmail.com" className="underline hover:text-yellow-100">PokeCardShop974@gmail.com</a></p>
        <p className="mb-2 relative z-10">
          🌐 <a href="https://www.facebook.com/profile.php?id=61577301435205&locale=fr_FR" target="_blank" className="underline hover:text-yellow-100">PokeCard Shop sur Facebook</a>
        </p>
        <p className="text-xs opacity-80 relative z-10">© 2025 PokeCard Shop. Tous droits réservés.</p>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-4 z-0 opacity-30">
          <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png" alt="Salamèche" className="w-16 h-16" />
          <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" alt="Bulbizarre" className="w-16 h-16" />
          <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png" alt="Carapuce" className="w-16 h-16" />
        </div>
      </footer>
    </div>
  );
}
