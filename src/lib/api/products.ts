import { API_BASE_URL } from "@/lib/constants";
import { Product } from "@/types/product";
import { getSafeImageUrl } from "@/lib/utils";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your everyday carry bag for items. Styled with a classic Scandinavian design, featuring a functional top fold-over closure.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim fit, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit Button Down",
    price: 15.99,
    description:
      "Detailed size information should be reviewed below on the product description. High quality fabric with stretch.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga 18K Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611591475140-be3a1c229ec1?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave Diamond Ring",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days. Premium polished gold band with pavé stones.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers. Improve PC Performance High Capacity formatted for Windows & Mac.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 8,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response. Boosts write performance for heavy workloads.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 2.9, count: 470 },
  },
  {
    id: 9,
    title: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance",
    price: 109,
    description:
      "3D NAND flash is applied to deliver high transfer speeds. Remarkable transfer speeds that enable faster bootup and improved overall system performance.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 4.8, count: 319 },
  },
  {
    id: 10,
    title: "WD 4TB Gaming Drive Portable External Hard Drive",
    price: 114,
    description:
      "Expanding your PS4/Xbox gaming experience, Play anywhere Fast and easy setup, Sleek design with high capacity.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 4.8, count: 400 },
  },
  {
    id: 11,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    description:
      "21.5 inches Full HD (1920 x 1080) widescreen IPS display. Radeon free sync technology. Zero frame design.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 2.9, count: 250 },
  },
  {
    id: 12,
    title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
    price: 999.99,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side Quantum dot (QLED) technology.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 2.2, count: 140 },
  },
  {
    id: 13,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      "Note: The Jackets is US standard size, Please choose size as your usual wear. Material: 100% Polyester; Detachable liner fabric.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 2.6, count: 235 },
  },
  {
    id: 14,
    title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      "100% POLYURETHANE (shell) 100% POLYESTER (lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 2.9, count: 340 },
  },
  {
    id: 15,
    title: "Rain Jacket Women Windbreaker Striped Lined Waterproof",
    price: 39.99,
    description:
      "Lightweight raincoat jacket for women, waterproof, windproof, hooded, breathable and soft touch.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 3.8, count: 679 },
  },
  {
    id: 16,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V Top",
    price: 9.85,
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported. Lightweight fabric with great stretch for comfort.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 4.7, count: 130 },
  },
  {
    id: 17,
    title: "Opna Women's Short Sleeve Moisture Wicking Athletic T-Shirt",
    price: 7.95,
    description:
      "100% Polyester. Lightweight, spacious and highly breathable with moisture wicking fabric.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 4.5, count: 146 },
  },
  {
    id: 18,
    title: "DANVOUY Womens Casual Cotton Short Sleeve Crewneck T Shirt",
    price: 12.99,
    description:
      "95% Cotton, 5% Spandex. Features: Casual, Short Sleeve, Letter Print, V-Neck, Fashion T-Shirts.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&auto=format&fit=crop&q=80",
    rating: { rate: 3.6, count: 145 },
  },
];

function sanitizeProduct(product: Product): Product {
  return {
    ...product,
    image: getSafeImageUrl(product.image, product.id, product.category),
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data: Product[] = await res.json();
    return data.map(sanitizeProduct);
  } catch (error) {
    console.warn("API fetch error or server down, using enhanced fallback products:", error);
    return FALLBACK_PRODUCTS.map(sanitizeProduct);
  }
}

export async function getProduct(id: string | number): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch product ${id}: ${res.statusText}`);
    }

    const data: Product = await res.json();
    return sanitizeProduct(data);
  } catch (error) {
    console.warn(`API fetch error for product ${id}, checking fallback:`, error);
    const found = FALLBACK_PRODUCTS.find((p) => String(p.id) === String(id));
    return found ? sanitizeProduct(found) : null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    const categories: string[] = await res.json();
    return categories;
  } catch (error) {
    console.warn("API fetch error, using fallback categories:", error);
    return ["electronics", "jewelery", "men's clothing", "women's clothing"];
  }
}
