"""web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app import views as app_views

urlpatterns = [
    path(r'', app_views.home),
    path('admin/', admin.site.urls),
    path('login/', app_views.home),
    path('loginerror/', app_views.home),
    path(r'done/', app_views.done, name='done'),
    path(r'me/', app_views.done, name='me'),
    path(r'logout/', app_views.logout, name='logout'),
    path(r'callapi/', app_views.callapi, name='callapi'),
    path(r'', include('social_django.urls', namespace='veracity'))
]
