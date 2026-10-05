import { API_BASE_URL } from "@/lib/constants";
import { Product } from "@/types/product";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your everyday carry bag for items. Styled with a classic Scandinavian design, featuring a functional top fold-over closure.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim fit, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga 18K Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiAs0GL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, 8.1, 7.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 8,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance, making it ideal for typical PC workloads.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 },
  },
];

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.warn("API fetch error, using fallback product data:", error);
    return FALLBACK_PRODUCTS;
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
    return data;
  } catch (error) {
    console.warn(`API fetch error for product ${id}, checking fallback:`, error);
    const found = FALLBACK_PRODUCTS.find((p) => String(p.id) === String(id));
    return found || null;
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
