export const validateRedirect = (redirect: string | null): string => {
    if (!redirect || !redirect.match(/^\/[a-zA-Z0-9/-]*$/)) {
      return "/"; // Retourne accueil si invalide
    }
    return redirect;
  };