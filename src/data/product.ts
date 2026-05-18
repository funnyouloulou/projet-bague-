// ============================================================
//  FICHIER DE CONFIGURATION PRODUIT
//  Remplacez ici toutes les données produit facilement
// ============================================================

export const PRODUCT = {
  brandName: "AURUM",
  brandTagline: "Portez qui vous êtes",

  name: "Bague Mandalorian Argent",
  subtitle: "Acier inoxydable 316L · Design géométrique · Finition argent",
  shortDescription:
    "Une bague audacieuse pour les hommes qui assument leur style. Acier chirurgical 316L, design géométrique unique, résistante au quotidien.",

  price: 12.00,
  originalPrice: 24.90,
  currency: "€",
  priceNote: "Livraison offerte • Satisfait ou remboursé 30 jours",

  images: [
    {
      src: "https://ae-pic-a1.aliexpress-media.com/kf/H208b9c85012d435bbaf5d6fc7a90cf23Y.jpg",
      alt: "Bague Guerrier Acier – vue de face",
    },
    {
      src: "https://ae-pic-a1.aliexpress-media.com/kf/H2b99a829e7bc4f0e8c69d29faec120d7R.jpg",
      alt: "Bague Guerrier Acier – vue de profil",
    },
    {
      src: "https://ae-pic-a1.aliexpress-media.com/kf/Hd8536a28f65d4ef09dd6d6fd864898c8Y.jpg",
      alt: "Bague Guerrier Acier – vue détail",
    },
    {
      src: "https://ae-pic-a1.aliexpress-media.com/kf/H9e240f00015344fb8a7679960b8e3054d.jpg",
      alt: "Bague Guerrier Acier – vue complète",
    },
  ],

  badges: ["Bestseller", "Livraison 7–14 jours", "Stock limité"],

  features: [
    {
      icon: "shield",
      title: "Acier 316L Premium",
      description: "Hypoallergénique, résistant à la corrosion et à l'usure du quotidien.",
    },
    {
      icon: "sparkles",
      title: "Finition bicolore",
      description: "Acier poli et noir mat pour un look unique et moderne.",
    },
    {
      icon: "ruler",
      title: "Tailles disponibles",
      description: "Du 54 au 70. Guide des tailles inclus à chaque commande.",
    },
    {
      icon: "truck",
      title: "Livraison offerte",
      description: "Livraison gratuite en France, Belgique et Suisse. 7–14 jours.",
    },
  ],

  longDescription: [
    "Pour les fans de Star Wars qui veulent afficher leur univers avec style.",
    "Inspirée du casque iconique du Mandalorian, la Bague Guerrier Acier est taillée pour ceux qui vivent selon leur propre code. Design géométrique agressif, finition bicolore acier et noir, acier inoxydable 316L — une pièce qui ne passe pas inaperçue.",
    "Légère, solide, sans entretien. This is the way.",
  ],

  sizes: ["54", "57", "60", "63", "65", "67", "70"],

  buyUrl: "https://fr.aliexpress.com/item/4000496965634.html",

  stockUrgency: "Plus que 9 pièces en stock",
  viewersCount: 17,
};

// --- Témoignages clients ---
// Remplacez ou ajoutez vos vrais témoignages
export const TESTIMONIALS = [
  {
    name: "Thomas M.",
    location: "Paris, France",
    rating: 5,
    date: "Mars 2025",
    text: "Reçue en 10 jours, emballage soigné. La bague est vraiment magnifique, bien plus belle qu'en photo. Je l'offre à nouveau pour la fête des pères.",
    avatar: "TM",
  },
  {
    name: "Alexandre D.",
    location: "Lyon, France",
    rating: 5,
    date: "Février 2025",
    text: "Qualité irréprochable pour ce prix. J'ai commandé la taille 62 et elle va parfaitement. Le plaquage or est épais et brillant. Je recommande vivement.",
    avatar: "AD",
  },
  {
    name: "Sébastien R.",
    location: "Bruxelles, Belgique",
    rating: 5,
    date: "Janvier 2025",
    text: "Troisième commande sur cette boutique. Toujours aussi satisfait. La chevalière obsidienne est ma préférée, un équilibre parfait entre sobriété et prestige.",
    avatar: "SR",
  },
  {
    name: "Karim B.",
    location: "Marseille, France",
    rating: 4,
    date: "Janvier 2025",
    text: "Très beau bijou, finition soignée. J'ai hésité mais je ne regrette pas du tout mon achat. Le service client a répondu rapidement à ma question sur les tailles.",
    avatar: "KB",
  },
];

// --- FAQ ---
export const FAQ = [
  {
    question: "Quel matériau est utilisé ?",
    answer:
      "La chevalière est fabriquée en acier inoxydable 316L (acier chirurgical), recouvert d'un plaquage or 18 carats triple couche. Ce matériau est hypoallergénique et résistant à l'oxydation.",
  },
  {
    question: "Comment choisir ma taille ?",
    answer:
      "Mesurez le tour de votre doigt avec un centimètre ou enroulez un papier autour, mesurez la longueur en mm — c'est votre taille. Un guide complet est joint à chaque commande. En cas de doute, commandez la taille supérieure.",
  },
  {
    question: "Quel est le délai de livraison ?",
    answer:
      "La livraison est estimée entre 7 et 14 jours ouvrés pour la France métropolitaine, Belgique et Suisse. Un numéro de suivi vous est envoyé dès l'expédition.",
  },
  {
    question: "Puis-je retourner l'article ?",
    answer:
      "Oui, vous disposez de 30 jours pour retourner votre commande si vous n'êtes pas satisfait, sous condition que l'article ne soit pas endommagé. Remboursement intégral garanti.",
  },
];
