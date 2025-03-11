from django.contrib import admin
from .models import (ProductType, Category, SubCategory, Product, Variant, Review,
                     Cart, CartItem, Order)


# ProductType
@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_by', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name',)
    ordering = ('name',)


# Category
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'product_type', 'icon', 'created_by', 'created_at')
    list_filter = ('product_type', 'created_at')
    search_fields = ('name', 'icon')
    ordering = ('product_type', 'name')


# SubCategory
@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'created_by', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name',)
    ordering = ('category', 'name')


# Product
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'subcategory', 'devise', 'approved', 'created_by', 'created_at')
    list_filter = ('category', 'subcategory', 'approved', 'created_at')
    search_fields = ('name',)
    list_editable = ('approved',)
    actions = ['approve_products']

    def approve_products(self, request, queryset):
        queryset.update(approved=True)
        self.message_user(request, "Les produits sélectionnés ont été approuvés.")
    approve_products.short_description = "Approuver les produits sélectionnés"


# Variant
@admin.register(Variant)
class VariantAdmin(admin.ModelAdmin):
    list_display = ('product', 'original_price', 'price', 'stock', 'sku', 'created_by', 'created_at')
    list_filter = ('product__category', 'created_at')
    search_fields = ('product__name', 'sku')
    ordering = ('product',)


# Review
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('variant', 'rating', 'approved', 'created_by', 'created_at')
    list_filter = ('rating', 'approved', 'created_at')
    search_fields = ('variant__product__name', 'comment')
    list_editable = ('approved',)
    actions = ['approve_reviews']

    def approve_reviews(self, request, queryset):
        queryset.update(approved=True)
        self.message_user(request, "Les avis sélectionnés ont été approuvés.")
    approve_reviews.short_description = "Approuver les avis sélectionnés"


# Cart
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('user__username',)


# CartItem
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'variant', 'quantity', 'created_at')
    list_filter = ('cart__is_active', 'created_at')
    search_fields = ('variant__product__name',)


# Order
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username',)
    list_editable = ('status',)
    readonly_fields = ('cart', 'payment', 'shipping_address')