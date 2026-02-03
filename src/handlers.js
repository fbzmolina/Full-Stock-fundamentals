import { getCategories, getCart, saveCart } from "./utils.js";

export async function homeHandler(_req, res) {
  const categories = await getCategories();
  res.render("index", { categories });
}

export async function categoryHandler(req, res) {
  const categories = await getCategories();
  const categoryId = Number(req.params.id);
  const category = categories.find((c) => c.id === categoryId);
  const products = category.products;
  res.render("category", { category, products });
}

export async function productHandler(req, res) {
  const categories = await getCategories();
  const productId = Number(req.params.id);
  let product = null;
  for (const category of categories) {
    product = category.products.find((p) => p.id === productId);
    if (product) break;
  }
  res.render("product", { product });
}

export async function addProductHandler(req, res) {
  const cart = await getCart();
  const categories = await getCategories();
  const productId = Number(req.params.id);
  let product = null;
  for (const category of categories) {
    product = category.products.find((p) => p.id === productId);
    if (product) break;
  }
  cart.push(product);
  saveCart(cart);
  res.redirect(303, "/");
}

export async function cartHandler(_req, res) {
  const cart = await getCart();
  const total = cart.reduce((accumulator, product) => {
    return accumulator + product.price;
  }, 0);
  res.render("cart", { cart, total });
}