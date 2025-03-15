from django.contrib import admin
from .models import (
    BaseProduct, ShopProduct, BookProduct, PharmacyProduct, 
    CompanyProduct, MarkProduct, SupermarketProduct, 
    Review, Promotion, Cart, CartItem
)

@admin.register(BaseProduct)
class BaseProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'subcategory', 'devise', 'price', 'created_by', 'created_at')
    list_filter = ('category', 'subcategory', 'created_by')
    search_fields = ('name', 'category__name', 'subcategory__name')
    list_per_page = 25
    ordering = ('name',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('name', 'category', 'subcategory', 'price')
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(ShopProduct)
class ShopProductAdmin(admin.ModelAdmin):
    list_display = ('base_product', 'shop', 'discount_price', 'stock', 'is_wholesale', 'expiration_date', 'created_by', 'created_at')
    list_filter = ('shop', 'is_wholesale', 'created_by')
    search_fields = ('base_product__name', 'shop__email')
    list_per_page = 25
    ordering = ('base_product__name',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('base_product', 'shop')
        }),
        ('Prix et Stock', {
            'fields': ('discount_price', 'stock', 'is_wholesale', 'expiration_date'),
            'classes': ('collapse',)
        }),
        ('Détails', {
            'fields': ('details',),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(BookProduct)
class BookProductAdmin(admin.ModelAdmin):
    list_display = ('base_product', 'company', 'author', 'isbn', 'is_free', 'discount_price', 'stock', 'created_by', 'created_at')
    list_filter = ('is_free', 'company', 'created_by')
    search_fields = ('author', 'isbn', 'base_product__name', 'company__name')
    list_per_page = 25
    ordering = ('base_product',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('base_product', 'company', 'author', 'isbn', 'is_free')
        }),
        ('Prix et Stock', {
            'fields': ('discount_price', 'stock'),
            'classes': ('collapse',)
        }),
        ('Fichier PDF', {
            'fields': ('pdf_file',),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
@admin.register(PharmacyProduct)
class PharmacyProductAdmin(admin.ModelAdmin):
    list_display = ('base_product', 'doctor', 'discount_price', 'stock', 'created_by', 'created_at')
    list_filter = ('doctor', 'created_by')
    search_fields = ('base_product__name', 'doctor__email')
    list_per_page = 25
    ordering = ('base_product__name',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('base_product', 'doctor')
        }),
        ('Prix et Stock', {
            'fields': ('discount_price', 'stock'),
            'classes': ('collapse',)
        }),
        ('Détails', {
            'fields': ('details',),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(CompanyProduct)
class CompanyProductAdmin(admin.ModelAdmin):
    list_display = ('base_product', 'company', 'stock', 'is_wholesale', 'created_by', 'created_at')
    list_filter = ('company', 'is_wholesale', 'created_by')
    search_fields = ('base_product__name', 'company__email')
    list_per_page = 25
    ordering = ('base_product__name',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('base_product', 'company')
        }),
        ('Prix et Stock', {
            'fields': ('stock', 'is_wholesale'),
            'classes': ('collapse',)
        }),
        ('Détails', {
            'fields': ('details',),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(MarkProduct)
class MarkProductAdmin(admin.ModelAdmin):
    list_display = ('base_product', 'mark', 'stock', 'is_active', 'created_by', 'created_at')
    list_filter = ('mark', 'is_active', 'created_by')
    search_fields = ('base_product__name', 'mark__email')
    list_per_page = 25
    ordering = ('base_product__name',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('base_product', 'mark')
        }),
        ('Prix et Stock', {
            'fields': ('stock', 'is_active'),
            'classes': ('collapse',)
        }),
        ('Détails', {
            'fields': ('details',),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(SupermarketProduct)
class SupermarketProductAdmin(admin.ModelAdmin):
    list_display = ('base_product', 'supermarket', 'discount_price', 'stock', 'is_wholesale', 'expiration_date', 'created_by', 'created_at')
    list_filter = ('supermarket', 'is_wholesale', 'created_by')
    search_fields = ('base_product__name', 'supermarket__email')
    list_per_page = 25
    ordering = ('base_product__name',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('base_product', 'supermarket')
        }),
        ('Prix et Stock', {
            'fields': ('discount_price', 'stock', 'is_wholesale', 'expiration_date'),
            'classes': ('collapse',)
        }),
        ('Détails', {
            'fields': ('details',),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('get_product', 'rating', 'created_by', 'created_at')
    list_filter = ('rating', 'created_by')
    search_fields = ('comment', 'created_by__username')
    list_per_page = 25
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('shop_product', 'book_product', 'pharmacy_product', 
                       'company_product', 'mark_product', 'supermarket_product', 
                       'rating', 'comment')
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_product(self, obj):
        return (obj.shop_product or obj.book_product or obj.pharmacy_product or 
                obj.company_product or obj.mark_product or obj.supermarket_product)
    get_product.short_description = "Produit"

@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ('get_product', 'discount_percentage', 'start_date', 'end_date', 'is_active', 'created_by', 'created_at')
    list_filter = ('start_date', 'end_date', 'created_by')
    list_per_page = 25
    ordering = ('-start_date',)
    date_hierarchy = 'start_date'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('entity', 'shop_product', 'company_product', 'supermarket_product', 
                       'discount_percentage')
        }),
        ('Dates', {
            'fields': ('start_date', 'end_date'),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_product(self, obj):
        return (obj.shop_product or obj.company_product or obj.supermarket_product)
    get_product.short_description = "Produit"

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_active', 'total_price', 'created_by', 'created_at')
    list_filter = ('is_active', 'created_by')
    search_fields = ('user__username',)
    list_per_page = 25
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('user', 'is_active')
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'get_product', 'quantity', 'total_price', 'created_by', 'created_at')
    list_filter = ('cart__user', 'created_by')
    search_fields = ('cart__user__username',)
    list_per_page = 25
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('cart', 'shop_product', 'book_product', 'pharmacy_product', 
                       'company_product', 'mark_product', 'supermarket_product', 'quantity')
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_product(self, obj):
        return (obj.shop_product or obj.book_product or obj.pharmacy_product or 
                obj.company_product or obj.mark_product or obj.supermarket_product)
    get_product.short_description = "Produit"