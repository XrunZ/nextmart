import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { getProduct } from "@/lib/api/products";
import { formatPrice, formatCategoryName } from "@/lib/utils";
import { ProductAddToCartForm } from "./ProductAddToCartForm";
import { ProductImage } from "@/components/products/ProductImage";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-site px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb / Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Product Image Panel (Takes 6 cols) */}
        <div className="md:col-span-6 rounded-card border border-border bg-white p-8 sm:p-12 flex items-center justify-center relative aspect-square">
          <ProductImage
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
            fallbackTitle={product.title}
          />
        </div>

        {/* Product Details Panel (Takes 6 cols) */}
        <div className="md:col-span-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {formatCategoryName(product.category)}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-1 text-sm text-muted">
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span className="font-semibold text-foreground">
                {product.rating?.rate?.toFixed(1) ?? "4.5"}
              </span>
              <span>•</span>
              <span className="text-xs">
                {product.rating?.count ?? 0} customer reviews
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-foreground py-2 border-y border-border">
            {formatPrice(product.price)}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Description
            </h3>
            <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Interactive Add To Cart Form */}
          <ProductAddToCartForm product={product} />

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border text-center text-xs text-muted">
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-4 w-4 text-accent" />
              <span>Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>Original Product</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="h-4 w-4 text-accent" />
              <span>30 Days Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
