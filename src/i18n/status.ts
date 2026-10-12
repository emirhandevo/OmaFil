import type { Locale } from "@/i18n/locales";

/** 404 ve hata ekranı. Kısa cümle, 11 dil. */
export const statusCopy: Record<
  Locale,
  {
    notFoundTitle: string;
    notFoundText: string;
    home: string;
    errorTitle: string;
    errorText: string;
    retry: string;
  }
> = {
  tr: {
    notFoundTitle: "Sayfa bulunamadı",
    notFoundText: "Aradığınız sayfa yok veya taşınmış olabilir.",
    home: "Ana sayfaya dön",
    errorTitle: "Bir sorun oluştu",
    errorText: "Sayfa şu an açılamadı. Yeniden deneyin veya ana sayfaya dönün.",
    retry: "Yeniden dene",
  },
  en: {
    notFoundTitle: "Page not found",
    notFoundText: "This page is missing or may have moved.",
    home: "Back to home",
    errorTitle: "Something went wrong",
    errorText: "This page could not open. Try again or return home.",
    retry: "Try again",
  },
  de: {
    notFoundTitle: "Seite nicht gefunden",
    notFoundText: "Diese Seite gibt es nicht oder sie wurde verschoben.",
    home: "Zur Startseite",
    errorTitle: "Ein Fehler ist aufgetreten",
    errorText: "Die Seite ließ sich nicht öffnen. Erneut versuchen oder zur Startseite.",
    retry: "Erneut versuchen",
  },
  fr: {
    notFoundTitle: "Page introuvable",
    notFoundText: "Cette page n’existe pas ou a été déplacée.",
    home: "Retour à l’accueil",
    errorTitle: "Un problème est survenu",
    errorText: "La page n’a pas pu s’ouvrir. Réessayez ou revenez à l’accueil.",
    retry: "Réessayer",
  },
  es: {
    notFoundTitle: "Página no encontrada",
    notFoundText: "Esta página no existe o se ha movido.",
    home: "Volver al inicio",
    errorTitle: "Ha ocurrido un problema",
    errorText: "La página no se pudo abrir. Inténtalo de nuevo o vuelve al inicio.",
    retry: "Reintentar",
  },
  it: {
    notFoundTitle: "Pagina non trovata",
    notFoundText: "Questa pagina non esiste o è stata spostata.",
    home: "Torna alla home",
    errorTitle: "Si è verificato un problema",
    errorText: "La pagina non si è aperta. Riprova o torna alla home.",
    retry: "Riprova",
  },
  pt: {
    notFoundTitle: "Página não encontrada",
    notFoundText: "Esta página não existe ou foi movida.",
    home: "Voltar ao início",
    errorTitle: "Ocorreu um problema",
    errorText: "A página não abriu. Tente de novo ou volte ao início.",
    retry: "Tentar de novo",
  },
  nl: {
    notFoundTitle: "Pagina niet gevonden",
    notFoundText: "Deze pagina bestaat niet of is verplaatst.",
    home: "Naar de startpagina",
    errorTitle: "Er ging iets mis",
    errorText: "De pagina kon niet openen. Probeer opnieuw of ga naar de startpagina.",
    retry: "Opnieuw proberen",
  },
  ru: {
    notFoundTitle: "Страница не найдена",
    notFoundText: "Этой страницы нет или она переехала.",
    home: "На главную",
    errorTitle: "Что-то пошло не так",
    errorText: "Страница не открылась. Попробуйте снова или вернитесь на главную.",
    retry: "Попробовать снова",
  },
  ar: {
    notFoundTitle: "الصفحة غير موجودة",
    notFoundText: "هذه الصفحة غير موجودة أو نُقلت.",
    home: "العودة إلى الرئيسية",
    errorTitle: "حدثت مشكلة",
    errorText: "تعذر فتح الصفحة. أعد المحاولة أو ارجع إلى الرئيسية.",
    retry: "إعادة المحاولة",
  },
  zh: {
    notFoundTitle: "页面未找到",
    notFoundText: "此页面不存在，或已经移动。",
    home: "返回首页",
    errorTitle: "出了问题",
    errorText: "页面打不开。请重试，或返回首页。",
    retry: "重试",
  },
};
