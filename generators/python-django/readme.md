# Veracity Authentication Demonstration(Python Django)

**Veracity is a constantly evolving platform and the authentication flow may change in the future. The code here will be updated to reflect this.**

**Last updated: 2018.07.27**

This Django application shows a quick example on how to perform authentication against the Veracity B2C tenant and retrive an authorization token in order to call the Veracity API. It uses 

## Content

- [Quick start](#quick-start) - Quick explanation on how to get this demo working on your machine.
- [Description](#description) - A description of concepts and structure.
- [Changes](#changes) - Log of changes to the code.
- [References](#references) - Usefull references for learning more.

## Quick start

Getting started is simple! To run this sample you will need:

To install Python for your operation system by following the instructions at [dot.net/core](https://www.python.org/).
An Internet connection

### Step 1: Register your application

Go the Veracity for Developers site and log in. In your developer progile you can register new applications. When you register the applciation redirectUri,please add /complete/azuread-b2c-oauth2/ as the suffix and also register a http endpoint to easily debug.


### Step 2: Configure the application

When your application is created, copy the client id , client secrets, redirectUri into the settings.py file

### Step 3: Install virtualeva and virtualenvwrapper

Install virtualeva and virtualenvwrapper using pip and work on the project in the environment you created

### Step 4: Install all the dependencies in requirement.txt

Using pip to install all the dependencies in requirement.txt


### Step 5: Run the application

Once all the above steps are completed all that is left is to start the application. Open a terminal or command line in the root folder of the application on your drive and run:

```
python manage.py runserver 3000
```

Go to http://localhost:3000

Note that you should use http for local environment

## Overview

The authentication process can be complex to grasp at first. We highly recommend that you familiarize yourself with how the OpenIDConnect flow works if you plan to work with the Veracity APIs. See [Understand the OpenIDConnect control flow in Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-protocols-openid-connect-code) for details.

If you are only concerned with how to perform authentication these files are the ones you should have a look at. The rest are mostly for plumbing and UI, but they are kept to demonstrate a way to structure a simple app that communicates with Veracity.

The authentication process can be summed up like this:

1. User opens the page and clicks login.
2. We redirect the user to a specific url on Azure B2C and provide a set of configuration options including a request for authentication and an access token to access the Veracity API. At this point the user leaves our control and is handed over to Azure B2C.
3. Behind the scenes Azure B2C may redirect the request to ADFS in order to perform authentication. If the user logs in correctly Azure B2C will return them back to us with several pieces of information including the user identity.
4. We receive this information and store it on our server for use later. Doing so saves us from having to call back to Azure B2C on every request in order to verify the user again.
5. At this point we can use the information Azure B2C returned to us to perform requests to the Veracity API provided we requested the information to begin with.
6. Every time the user performs an action that requires a call to the Veracity API we perform this by adding the users access token to the request.
7. Once the user finishes their work they click logout.
8. We remove all our session information about the user and redirect them to Azure B2C so they can do the same.
9. Finally we redirect them to ADFS so that it can remove the final set of session cookies. At this point the user is completely signed out.

This is the process we have set up in this demo application. Check the code comments for `// Overview step #` to see where we perform code that maps to specific points in the description above.

## Changes

If the authentication flow or apis in this demo are updated this section will contain a description of the changes and any updates you may need to do to your code in order to support these.

v0.1.0:

- Initial release

## References

- [Veracity Service API](https://developer.veracity.com/doc/service-api)
- [Veracity Data Fabric API](https://developer.veracity.com/doc/data-fabric-api)
- [Azure B2C OpenIDConnect Example](https://github.com/Azure-Samples/active-directory-b2c-dotnetcore-webapp)
- [Understand the OpenIDConnect control flow in Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-protocols-openid-connect-code)
- [Social-app-django](https://github.com/python-social-auth/social-app-django)