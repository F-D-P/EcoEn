import os
import sys

# Ruta al directorio donde está manage.py
path = '/home/1234Franco1234/ProgIV-EcoEn-clean/Prog_EcoEn'
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'ecoen_project.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
