from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

class CustomUserTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email='hasanvand296@gmail.com',
            phone='09120121973',
            password='@Mm123123',
            name='mohammad'
        )

    def test_create_user(self):
        self.assertEqual(self.user.email, 'hasanvand296@gmail.com')
        self.assertEqual(self.user.phone, '09120121973')
        self.assertEqual(self.user.name, 'mohammad')
        self.assertTrue(self.user.is_active)
        self.assertFalse(self.user.is_staff)
        self.assertFalse(self.user.is_superuser)

    def test_create_superuser(self):
        admin_user = get_user_model().objects.create_superuser(
            email='admin@gmail.com',
            phone='09020121973',
            password='@admin123',
            name='Admin'
        )
        self.assertEqual(admin_user.email, 'admin@gmail.com')
        self.assertEqual(admin_user.phone, '09020121973')
        self.assertEqual(admin_user.name, 'Admin')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)











class LoginTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email='hasanvand296@gmail.com',
            phone='09120121973',
            password='@Mm123123',
            name='mohammad'
        )

    def test_login_success(self):
        data = {
            'email': 'hasanvand296@gmail.com',
            'password': '@Mm123123'
        }
        response = self.client.post('/auth/login/', data)
        #print(response.data) 
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)





    def test_login_failure_invalid_credentials(self):
        data = {
            'email': 'hasanvand296@gmail.com',
            'password': '@Mm12123'
        }
        response = self.client.post('/auth/login/', data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_failure_missing_credentials(self):
        response = self.client.post('/auth/login/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        self.assertIn('password', response.data)
        self.assertIn('This field is required.', response.data['email'][0])
        self.assertIn('This field is required.', response.data['password'][0])

    def test_login_failure_inactive_user(self):
        self.user.is_active = False
        self.user.save()
        data = {
            'email': 'hasanvand296@gmail.com',
            'password': '@Mm12123'
        }
        response = self.client.post('/auth/login/', data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_failure_nonexistent_user(self):
        data = {
            'email': 'hasanvand296@gmail.com',
            'password': '@Mm12123'
        }
        response = self.client.post('/auth/login/', data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
