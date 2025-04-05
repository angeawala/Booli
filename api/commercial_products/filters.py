# commercial_products/filters.py (nouveau fichier)
from django_filters import rest_framework as filters
from .models import CommercialProduct

class CommercialProductFilter(filters.FilterSet):
    prix_normal_min = filters.NumberFilter(method='filter_prix_normal_min')
    prix_normal_max = filters.NumberFilter(method='filter_prix_normal_max')

    class Meta:
        model = CommercialProduct
        fields = ['category__id', 'subCategory__id', 'fournisseur_verifie']

    def filter_prix_normal_min(self, queryset, name, value):
        return queryset.filter(base_product__prix_normal__contains={'valeur': value}).filter(
            base_product__prix_normal__valeur__gte=value
        )

    def filter_prix_normal_max(self, queryset, name, value):
        return queryset.filter(base_product__prix_normal__contains={'valeur': value}).filter(
            base_product__prix_normal__valeur__lte=value
        )