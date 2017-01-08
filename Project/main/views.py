from django.shortcuts import render
from django.http import *
from models import *
from django.shortcuts import render

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
	try:
		acc = Account.objects.get(id=acc_id)
	except Account.DoesNotExist:
		raise Http404("Account does not exist")
	return render(request, 'main/details.html', {'account': acc})	