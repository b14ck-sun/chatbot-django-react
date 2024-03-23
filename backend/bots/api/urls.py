from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import BotViewSet

bot_router = DefaultRouter()
bot_router.register(r'bots', BotViewSet)