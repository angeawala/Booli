from rest_framework import serializers
from core.serializers import BaseSerializer
from .models import Agency, Category, Type, Domain, Service, OpportunityType, Opportunity

class TypeSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Type
        fields = BaseSerializer.Meta.fields + ['name', 'description']

class DomainSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Domain
        fields = BaseSerializer.Meta.fields + ['name', 'description']

class AgencyCategorySerializer(BaseSerializer):  # Renommé ici
    type = TypeSerializer(read_only=True)
    type_id = serializers.UUIDField(write_only=True)
    domain = DomainSerializer(read_only=True)
    domain_id = serializers.UUIDField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = Category
        fields = BaseSerializer.Meta.fields + ['name', 'type', 'type_id', 'domain', 'domain_id', 'image', 'description']

    def validate(self, data):
        if 'type_id' in data and not Type.objects.filter(id=data['type_id']).exists():
            raise serializers.ValidationError("Type invalide")
        if 'domain_id' in data and not Domain.objects.filter(id=data['domain_id']).exists():
            raise serializers.ValidationError("Domaine invalide")
        return data

class ServiceSerializer(BaseSerializer):
    agency = serializers.PrimaryKeyRelatedField(read_only=True)
    agency_id = serializers.UUIDField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = Service
        fields = BaseSerializer.Meta.fields + ['agency', 'agency_id', 'name', 'description', 'image']

    def validate(self, data):
        if 'agency_id' in data and not Agency.objects.filter(id=data['agency_id']).exists():
            raise serializers.ValidationError("Agence invalide")
        return data

class ContactSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=1000)
    subject = serializers.CharField(max_length=200, required=False, default="Demande de contact")

class OpportunityTypeSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = OpportunityType
        fields = BaseSerializer.Meta.fields + ['name', 'description']

class OpportunitySerializer(BaseSerializer):
    agency = serializers.PrimaryKeyRelatedField(read_only=True)
    agency_id = serializers.UUIDField(write_only=True)
    type = OpportunityTypeSerializer(read_only=True)
    type_id = serializers.UUIDField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = Opportunity
        fields = BaseSerializer.Meta.fields + [
            'agency', 'agency_id', 'type', 'type_id', 'title', 'description', 
            'requirements', 'application_deadline'
        ]

    def validate(self, data):
        if 'agency_id' in data and not Agency.objects.filter(id=data['agency_id']).exists():
            raise serializers.ValidationError("Agence invalide")
        if 'type_id' in data and not OpportunityType.objects.filter(id=data['type_id']).exists():
            raise serializers.ValidationError("Type d'opportunité invalide")
        return data

class AgencySerializer(BaseSerializer):
    category = AgencyCategorySerializer(read_only=True)  # Mise à jour ici
    category_id = serializers.UUIDField(write_only=True)
    type = TypeSerializer(read_only=True)
    type_id = serializers.UUIDField(write_only=True)
    domain = DomainSerializer(read_only=True)
    domain_id = serializers.UUIDField(write_only=True)
    services = ServiceSerializer(many=True, read_only=True)
    opportunities = OpportunitySerializer(many=True, read_only=True)

    class Meta(BaseSerializer.Meta):
        model = Agency
        fields = BaseSerializer.Meta.fields + [
            'name', 'description', 'image', 'address', 'phone', 'hours',
            'email', 'website', 'category', 'category_id', 'type', 'type_id', 
            'domain', 'domain_id', 'services', 'opportunities'
        ]

    def validate(self, data):
        if 'category_id' in data and not Category.objects.filter(id=data['category_id']).exists():
            raise serializers.ValidationError("Catégorie invalide")
        if 'type_id' in data and not Type.objects.filter(id=data['type_id']).exists():
            raise serializers.ValidationError("Type invalide")
        if 'domain_id' in data and not Domain.objects.filter(id=data['domain_id']).exists():
            raise serializers.ValidationError("Domaine invalide")
        return data