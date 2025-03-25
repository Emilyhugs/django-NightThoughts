from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.messages import get_messages
from .models import Thought
from .forms import ThoughtForm


class ThoughtViewTests(TestCase):

    def setUp(self):
        # Create a test user and log them in
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.client.login(username="testuser", password="testpassword")
        
        # Create some thoughts for the user
        self.thought1 = Thought.objects.create(user=self.user, content="This is a thought 1")
        self.thought2 = Thought.objects.create(user=self.user, content="This is a thought 2")

    def test_thought_list_view(self):
        # Test the ThoughtList view to ensure it loads correctly and filters by user
        response = self.client.get(reverse('thought_list'))
        
        # Check that the response is OK (status code 200)
        self.assertEqual(response.status_code, 200)
        # Check if the correct template is used
        self.assertTemplateUsed(response, 'thoughts/thoughts_list.html')
        # Ensure only the thoughts of the logged-in user are displayed
        self.assertContains(response, self.thought1.content)
        self.assertContains(response, self.thought2.content)
        self.assertNotContains(response, "Some other user's thought")

    def test_create_thought_view(self):
        # Test creating a new thought
        response = self.client.post(reverse('create_thought'), {'content': 'This is a new thought'})
        
        # Check if the thought was created
        self.assertEqual(Thought.objects.count(), 3)
        # Check if the user was redirected to the home page
        self.assertRedirects(response, reverse('home'))
        
        # Check for success message
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(str(messages[0]), "Your thought has been added successfully")

    def test_update_thought_view(self):
        # Test updating an existing thought
        response = self.client.post(reverse('update_thought', args=[self.thought1.id]), {'content': 'Updated thought content'})
        
        # Ensure the thought was updated
        self.thought1.refresh_from_db()
        self.assertEqual(self.thought1.content, 'Updated thought content')
        
        # Check if redirected to the home page
        self.assertRedirects(response, reverse('home'))
        
        # Check for success message
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(str(messages[0]), "Thought Updated!")

    def test_update_thought_invalid_form(self):
        # Test updating a thought with invalid form data
        response = self.client.post(reverse('update_thought', args=[self.thought1.id]), {'content': ''})
        
        # Ensure the thought wasn't updated (invalid form)
        self.thought1.refresh_from_db()
        self.assertEqual(self.thought1.content, 'This is a thought 1')
        
        # Ensure the form errors are shown
        self.assertFormError(response, 'thought_form', 'content', 'This field is required.')
        
        # Check for error message
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(str(messages[0]), "Error updating thought!")

    def test_delete_thought_view(self):
        # Test deleting a thought
        response = self.client.post(reverse('delete_thought', args=[self.thought1.id]))
        
        # Ensure the thought was deleted
        self.assertEqual(Thought.objects.count(), 1)
        self.assertFalse(Thought.objects.filter(id=self.thought1.id).exists())
        
        # Check for success message
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(str(messages[0]), "Thought Deleted!")
        
        # Check if redirected to home page
        self.assertRedirects(response, reverse('home'))

    def test_delete_thought_invalid(self):
        # Test attempting to delete a thought that doesn't belong to the logged-in user
        another_user = User.objects.create_user(username="anotheruser", password="anotherpassword")
        thought_by_another_user = Thought.objects.create(user=another_user, content="This thought doesn't belong to the test user")
        
        response = self.client.post(reverse('delete_thought', args=[thought_by_another_user.id]))
        
        # Ensure the thought is not deleted
        self.assertEqual(Thought.objects.count(), 2)
        self.assertTrue(Thought.objects.filter(id=thought_by_another_user.id).exists())
        
        # Check for error message
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(str(messages[0]), "Error deleting thought")
        
        # Check if redirected to home page
        self.assertRedirects(response, reverse('home'))
