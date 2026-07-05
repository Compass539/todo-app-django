from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {'error': 'ユーザー名とパスワードを入力してください'},
            status=status.HTTP_400_BAD_REQUEST
        )
    

    if User.objects.filter(username=username).exists():
        return Response(
            {'error':'このユーザー名はすでに使われています'},
            status=status.HTTP_400_BAD_REQUEST

        )
    
    User.objects.create_user(username=username, password=password)
    return Response(
        {'message':'ユーザー登録が完了しました'},
        status=status.HTTP_201_CREATED
    )