
from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Thought
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, get_object_or_404
from .forms import ThoughtForm
from django.urls import reverse_lazy, reverse
from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse

# Create your views here.
class ThoughtList(LoginRequiredMixin, generic.ListView):
    template_name = "thoughts/thoughts_list.html"
    context_object_name = "thoughts"
    paginate_by = 6

    # Custom queryset to only show the thoughts of the logged-in user
    def get_queryset(self):
        queryset = Thought.objects.filter(user=self.request.user).order_by("-created_at")
        return queryset

    def get_context_data(self, **kwargs):
      context = super().get_context_data(**kwargs)
      context['thought_form'] = ThoughtForm() # For the form in the thoughts_list.html template
      return context
    
class CreateThought(LoginRequiredMixin, CreateView):
    model = Thought
    form_class = ThoughtForm
    success_url = reverse_lazy("home")  # Redirect to the thoughts list page

    def form_valid(self, form):
        # Automatically associate the thought with the logged-in user
        form.instance.user = self.request.user
        messages.add_message(self.request, messages.SUCCESS,
        'Your thought has been added successfully')

        return super().form_valid(form)
    


@login_required
def update_thought(request, thought_id):
    thought = get_object_or_404(Thought, pk=thought_id, user=request.user)

    if request.method == "POST":
       thought_form = ThoughtForm(data=request.POST, instance=thought)
       if thought_form.is_valid():
               thought.save()
               messages.add_message(request, messages.SUCCESS, 'Thought Updated!')
               return HttpResponseRedirect(reverse("home"))
       else:
               messages.add_message(request, messages.ERROR, 'Error updating thought!')
               return render(request, "thoughts/thought_form.html", {"thought_form": thought_form})
       
    return JsonResponse({"content": thought.content})

@login_required
def delete_thought(request, thought_id):
    try:
        thought = get_object_or_404(Thought, pk=thought_id, user=request.user)
        thought.delete()
        messages.add_message(request, messages.SUCCESS, 'Thought Deleted!')
    except Exception as e:
        messages.add_message(request, messages.ERROR, f'Error deleting thought: {str(e)}')
    return HttpResponseRedirect(reverse("home"))



# @login_required
# def delete_thought(request, thought_id):
#     thought = get_object_or_404(Thought, id=thought_id, user=request.user)
#     if request.method == "POST":
#         thought.delete()
#         return redirect('thoughts_list')
#     return render(request, 'thoughts/thought_confirm_delete.html', {'thought': thought})