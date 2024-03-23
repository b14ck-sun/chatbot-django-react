from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from ..models import Bot
from .serializers import BotSerializer
import re

class BotViewSet(ModelViewSet):
    queryset = Bot.objects.all()
    serializer_class = BotSerializer

    def create(self, request, *args, **kwargs):

        # Clean data
        request.data['text'] = self.remove_html_tags(request.data['text'])

        # Serialize your data if needed
        data_serializer = self.get_serializer(data=request.data)
        data_serializer.is_valid(raise_exception=True)

        # Call your custom function here
        print(request.data)
        custom_result = self.custom_function(data=request.data)

        # Serialize your result if needed
        serializer = self.get_serializer(data=custom_result)
        serializer.is_valid(raise_exception=True)
        
        # Save the data
        self.perform_create(data_serializer)
        self.perform_create(serializer)
        
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def custom_function(self, data):
        # Your custom logic here
        # return {'custom_data': 'value'}
        response = "My response to: " + data['text']
        response_json = {'text': response, 'sender': 'chatbot'}
        return response_json
    
    def remove_html_tags(self, text):
        clean_text = re.sub(r'<[^>]*>', '', text)
        return clean_text