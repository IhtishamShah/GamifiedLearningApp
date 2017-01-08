from django.shortcuts import *
from django.http import *
from models import *

# Create your views here.

def index(request):
	return HttpResponse("<h1>This is the main page</h1>")

def getAccount(request):
	html = ''

	allAccounts = Account.objects.all()
	
	ctx = {
		'allAccounts': allAccounts
	}

	return render(request, 'main/account.html', ctx)

def getAccountById(request, acc_id):
	acc = get_object_or_404(Account, pk=acc_id)
	return render(request, 'main/details.html', {'account': acc})	