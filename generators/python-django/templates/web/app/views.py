import json
import requests
from requests_oauth2 import OAuth2BearerToken
from django.conf import settings
from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import redirect,render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as auth_logout, login

from social_core.backends.oauth import BaseOAuth1, BaseOAuth2
from social_core.backends.google import GooglePlusAuth
from social_core.backends.utils import load_backends
from social_django.utils import psa, load_strategy


from .decorators import render_to

def logout(request):
    """Logs out user"""
    auth_logout(request)
    return redirect('/')


@render_to('home.html')
def home(request):
    """Home view, displays login mechanism"""
    if request.user.is_authenticated:
        return redirect('done')

def login_error(request):
    print(request)


@login_required
@render_to('me.html')
def done(request):
    """Login complete view, displays user data"""
    pass

@login_required
def callapi(request):
    profile_endpoint = f'{settings.VERACITY_MYSERVICE_ENDPOINT}/my/profile' 
    social = request.user.social_auth.get(provider=settings.SOCIAL_AUTH_AZUREAD_B2C_OAUTH2_SCHEMA)
    print(social.extra_data["access_token"])
    context={}
    with requests.Session() as s:
        s.auth = OAuth2BearerToken(social.extra_data["access_token"])
        r = s.get(profile_endpoint)
        r.raise_for_status()
        data = r.json()
        context["result"]=data
    return render(request,'api.html',context)