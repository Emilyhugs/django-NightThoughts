from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy, reverse
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView

from .models import Thought
from .forms import ThoughtForm


class ThoughtList(LoginRequiredMixin, generic.ListView):
    template_name = "thoughts/thoughts_list.html"
    context_object_name = "thoughts"
    paginate_by = 6

    def get_queryset(self):
        """Return the thoughts of the logged-in user ordered by creation date."""
        return Thought.objects.filter(user=self.request.user).order_by("-created_at")

    def get_context_data(self, **kwargs):
        """Add the thought form to the context."""
        context = super().get_context_data(**kwargs)
        context['thought_form'] = ThoughtForm()  # For the form in the thoughts_list.html template
        return context


class CreateThought(LoginRequiredMixin, CreateView):
    model = Thought
    form_class = ThoughtForm
    success_url = reverse_lazy("home")  # Redirect to the thoughts list page

    def form_valid(self, form):
        """Automatically associate the thought with the logged-in user."""
        form.instance.user = self.request.user
        messages.success(self.request, 'Your thought has been added successfully')
        return super().form_valid(form)


@login_required
def update_thought(request, thought_id):
    """Update an existing thought."""
    thought = get_object_or_404(Thought, pk=thought_id, user=request.user)

    if request.method == "POST":
        thought_form = ThoughtForm(data=request.POST, instance=thought)
        if thought_form.is_valid():
            thought.save()
            messages.success(request, 'Thought Updated!')
            return HttpResponseRedirect(reverse("home"))
        else:
            messages.error(request, 'Error updating thought!')
            return render(request, "thoughts/thought_form.html", {"thought_form": thought_form})

    return JsonResponse({"content": thought.content})


@login_required
def delete_thought(request, thought_id):
    """Delete a thought."""
    try:
        thought = get_object_or_404(Thought, pk=thought_id, user=request.user)
        thought.delete()
        messages.success(request, 'Thought Deleted!')
    except Exception:
        messages.error(request, 'Error deleting thought')
    return HttpResponseRedirect(reverse("home"))
