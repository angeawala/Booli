# payement/views.py
from rest_framework import viewsets, permissions
from .models import Devise, ExchangeRate, PaymentMethod, Payment, Invoice
from .serializers import (DeviseSerializer, ExchangeRateSerializer, PaymentMethodSerializer,
                          PaymentSerializer, InvoiceSerializer)
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import FileResponse
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from django.core.files.base import ContentFile


class DeviseViewSet(viewsets.ModelViewSet):
    queryset = Devise.objects.all()
    serializer_class = DeviseSerializer
    permission_classes = [permissions.DjangoModelPermissions]  # Réservé aux admins


class ExchangeRateViewSet(viewsets.ModelViewSet):
    queryset = ExchangeRate.objects.all()
    serializer_class = ExchangeRateSerializer
    permission_classes = [permissions.DjangoModelPermissions]  # Réservé aux admins


class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = [permissions.DjangoModelPermissions]  # Réservé aux admins


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]  # Ouvert à tous les authentifiés

    def perform_create(self, serializer):
        # Automatiquement définir created_by comme l'utilisateur courant
        serializer.save(created_by=self.request.user)


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def create_invoice(self, request):
        payment_id = request.data.get('payment_id')
        payment = Payment.objects.get(id=payment_id)

        # Créer l'Invoice avec detail généré
        invoice = Invoice.objects.create(payment=payment, created_by=request.user)

        # Générer le PDF avec mise en page améliorée
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4

        # En-tête
        p.setFont("Helvetica-Bold", 16)
        p.drawCentredString(width / 2, height - 50, f"Facture #{payment.id}")
        p.setFont("Helvetica", 12)
        p.drawString(50, height - 80, f"Type: {payment.type.capitalize()}")
        p.drawString(50, height - 100, f"Statut: {payment.status}")
        p.drawString(50, height - 120, f"Date: {payment.created_at.strftime('%Y-%m-%d %H:%M:%S')}")
        p.line(50, height - 130, width - 50, height - 130)

        # Détails
        y = height - 150
        p.setFont("Helvetica-Bold", 12)
        p.drawString(50, y, "Détails :")
        y -= 20
        p.setFont("Helvetica", 10)

        if payment.type == "commande":
            p.drawString(50, y, "Articles commandés :")
            y -= 20
            p.setFillColor(colors.grey)
            p.rect(50, y - 5, width - 100, 20, fill=True, stroke=False)
            p.setFillColor(colors.black)
            p.drawString(60, y, "Produit")
            p.drawString(300, y, "Quantité")
            p.drawString(400, y, "Prix")
            y -= 20

            for item in invoice.detail.get("items", []):
                p.drawString(60, y, item["variant"][:50])  # Limite à 50 caractères
                p.drawString(300, y, str(item["quantity"]))
                p.drawString(400, y, f"{item['price_in_client_devise']} {payment.devise.code}")
                y -= 20
            y -= 10
            p.drawString(50, y, f"Total: {invoice.detail['total']} {invoice.detail['client_devise']}")
        elif payment.type == "reservation":
            for key, value in invoice.detail.items():
                p.drawString(50, y, f"{key.capitalize()}: {value}")
                y -= 20

        # Pied de page
        p.line(50, 50, width - 50, 50)
        p.setFont("Helvetica-Oblique", 8)
        p.drawCentredString(width / 2, 30, "Généré par xAI - Merci de votre confiance !")

        p.showPage()
        p.save()

        # Sauvegarder le PDF
        pdf_content = buffer.getvalue()
        buffer.close()
        invoice.file.save(f"invoice_{invoice.id}.pdf", ContentFile(pdf_content))
        invoice.save()

        return FileResponse(invoice.file, as_attachment=True, filename=f"invoice_{invoice.id}.pdf")