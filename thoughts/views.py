from django.shortcuts import render
from django.views import generic
from .models import Thought
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404

# Create your views here.
class ThoughtList(generic.ListView):
   queryset = Thought.objects.all()
   template_name = "thoughts/thoughts_list.html"
   paginate_by = 6
   
#     thoughts = Thought.objects.filter(user=request.user).order_by('-created_at')  # Fetch user's thoughts
    
#     paginator = Paginator(thoughts, 5)  # Show 5 thoughts per page
#     page_number = request.GET.get('page')  # Get page number from URL (e.g., ?page=2)
#     page_obj = paginator.get_page(page_number)  # Get the correct page of thoughts
    
#     return render(request, 'thoughts/thoughts_list.html', {'page_obj': page_obj})

# @login_required
# def thought_detail(request, thought_id):
#     thought = get_object_or_404(Thought, id=thought_id, user=request.user)  # Ensures ownership
#     return render(request, 'thoughts/thought_detail.html', {'thought': thought})

# def create_thought(request):
#     if request.method == "POST":
#         form = ThoughtForm(request.POST)
#         if form.is_valid():
#             thought = form.save(commit=False)
#             thought.user = request.user  # Link to logged-in user
#             thought.save()
#             return redirect('thoughts_list')
#     else:
#         form = ThoughtForm()
#     return render(request, 'thoughts/thought_form.html', {'form': form})

# @login_required
# def update_thought(request, thought_id):
#     thought = get_object_or_404(Thought, id=thought_id, user=request.user)
#     if request.method == "POST":
#         form = ThoughtForm(request.POST, instance=thought)
#         if form.is_valid():
#             form.save()
#             return redirect('thoughts_list')
#     else:
#         form = ThoughtForm(instance=thought)
#     return render(request, 'thoughts/thought_form.html', {'form': form})

# @login_required
# def delete_thought(request, thought_id):
#     thought = get_object_or_404(Thought, id=thought_id, user=request.user)
#     if request.method == "POST":
#         thought.delete()
#         return redirect('thoughts_list')
#     return render(request, 'thoughts/thought_confirm_delete.html', {'thought': thought})