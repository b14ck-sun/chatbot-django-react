from rest_framework.serializers import ModelSerializer
from ..models import Bot

class BotSerializer(ModelSerializer):
    class Meta:
        model = Bot
        fields = ('id', 'sender', 'text')