from .annotate_terms import get_annotation

class ProcessHTML:
    def init(html):
      annotated_terms = get_annotation(html, 0.95)
      return {"cards" : annotated_terms}
    
# We take out bs4 since we are using client-side cleaning now (vanilla JS provides some good tools for this)