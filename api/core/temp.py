
from django.urls import path
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model # Importe ton modèle CustomUser

User = get_user_model()

@csrf_exempt  # Désactive CSRF temporairement (à sécuriser si utilisé longtemps)
def create_superuser_view(request):
    if request.method == "GET":
        # Formulaire HTML avec tous les champs requis
        html = """
        <h2>Créer un superutilisateur</h2>
        <form method="POST">
            <label>Email: <input type="email" name="email" required></label><br>
            <label>Mot de passe: <input type="password" name="password" required></label><br>
            <label>Prénom: <input type="text" name="first_name" required></label><br>
            <label>Nom: <input type="text" name="last_name" required></label><br>
            <label>Pays: <input type="text" name="country" required></label><br>
            <label>Ville: <input type="text" name="city" required></label><br>
            <label>Date de naissance (YYYY-MM-DD): <input type="date" name="birth_date" required></label><br>
            <label>Genre: 
                <select name="gender" required>
                    <option value="male">Masculin</option>
                    <option value="female">Féminin</option>
                    <option value="other">Autre</option>
                </select>
            </label><br>
            <button type="submit">Créer</button>
        </form>
        """
        return HttpResponse(html)
    
    elif request.method == "POST":
        # Récupérer les données du formulaire
        email = request.POST.get("email")
        password = request.POST.get("password")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        country = request.POST.get("country")
        city = request.POST.get("city")
        birth_date = request.POST.get("birth_date")
        gender = request.POST.get("gender")

        # Vérifier si un superutilisateur existe déjà
        if User.objects.filter(is_superuser=True).exists():
            return HttpResponse("Un superutilisateur existe déjà. Supprimez cette vue si elle n'est plus nécessaire.")
        
        # Créer le superutilisateur avec CustomUser
        try:
            user = User.objects.create_superuser(
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                country=country,
                city=city,
                birth_date=birth_date,
                gender=gender
            )
            return HttpResponse("Superutilisateur créé avec succès ! Vous pouvez supprimer cette vue maintenant.")
        except Exception as e:
            return HttpResponse(f"Erreur : {str(e)}")
