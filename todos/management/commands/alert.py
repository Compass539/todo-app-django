from django.core.management.base import BaseCommand
from datetime import datetime, timedelta
from todos.models import Todo
import requests
import os

class Command(BaseCommand):
    help = "Todo一覧のタスクの期限日が1週間に迫っているものをDiscordに通知を送信する処理です。"
        

    def handle(self, *args, **options):
        today = datetime.today()
        one_weeks_later = today + timedelta(days=7)

        todos = Todo.objects.filter(
            completed = False,
            due_date__isnull = False,
            due_date__lte = one_weeks_later,
            due_date__gte = today
        )
        for todo in todos:
            message = f"{todo.title}, {todo.due_date}, タスクの期限が迫っています"
            print(f"送信中: {todo.title}")
            requests.post(
                url=os.environ.get('DISCORD_WEBHOOK_URL'),
                json ={"content": message}
            )

