from django.urls import path, include
from rest_framework.routers import DefaultRouter
from bots.api.urls import bot_router

router = DefaultRouter()

router.registry.extend(bot_router.registry)

urlpatterns = [
    path('', include(router.urls))
]